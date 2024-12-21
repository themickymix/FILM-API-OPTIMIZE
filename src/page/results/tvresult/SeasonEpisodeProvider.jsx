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
  const [season, setSeason] = useState(1);
  const [seasons, setSeasons] = useState([]);
  const [episode, setEpisode] = useState(1);

  // Fetch seasons on initial load (only once)
  useEffect(() => {
    // Fetch the details for the show to get all available seasons
    const fetchSeasons = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/tv/${id}?language=en-US`
      );
      const result = await response.json();
      setSeasons(result.seasons || []);
    };
    fetchSeasons();
  }, [id, seasons]);

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
