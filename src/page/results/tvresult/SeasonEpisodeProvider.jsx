import React, { createContext, useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";

// Create the context
const SeasonEpisodeContext = createContext();

// Create a custom hook to use the context
export const useSeasonEpisode = () => {
  return useContext(SeasonEpisodeContext);
};

// Create a provider component to wrap the app or specific sections
export const SeasonEpisodeProvider = ({ children }) => {
  const { id } = useParams();

  // State initialization with localStorage values specific to the current TV show ID
  const [season, setSeason] = useState(() => {
    const storedSeason = localStorage.getItem(`season_${id}`);
    return storedSeason ? parseInt(storedSeason, 10) : 1;
  });

  const [episode, setEpisode] = useState(() => {
    const storedEpisode = localStorage.getItem(`episode_${id}`);
    return storedEpisode ? parseInt(storedEpisode, 10) : 1;
  });

  const [seasons, setSeasons] = useState([]);

  // Fetch seasons on initial load (only once per TV show)
  useEffect(() => {
    const fetchSeasons = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/tv/${id}?language=en-US`
      );
      const result = await response.json();
      setSeasons(result.seasons || []);
    };
    fetchSeasons();
  }, [id, seasons]);

  // Update localStorage whenever season changes, specific to the current TV show ID
  useEffect(() => {
    localStorage.setItem(`season_${id}`, season);
  }, [season, id]);

  // Update localStorage whenever episode changes, specific to the current TV show ID
  useEffect(() => {
    localStorage.setItem(`episode_${id}`, episode);
  }, [episode, id]);

  const value = {
    id, // Include id in the context value
    season,
    setSeason,
    episode,
    setEpisode,
    seasons,
  };

  return (
    <SeasonEpisodeContext.Provider value={value}>
      {children}
    </SeasonEpisodeContext.Provider>
  );
};
