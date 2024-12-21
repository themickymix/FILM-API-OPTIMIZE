import React, { useState, useEffect } from "react";
import { IMG_URL } from "../../../server/config";
import { GetApi } from "../../../custom-hooks/GetApi";
import { useNavigate } from "react-router-dom";

function Recommendations({ id }) {
  const navigate = useNavigate();
  const [genres, setGenres] = useState({});

  // Use TV genre API and recommendations API
  const GENRES_URL = `https://api.themoviedb.org/3/genre/tv/list?language=en-US`;
  const RECOMMENDATIONS_URL = `https://api.themoviedb.org/3/tv/${id}/recommendations?language=en-US&page=1`;

  // Fetch genres using GetApi
  const {
    data: genresData,
    loading: genresLoading,
    error: genresError,
  } = GetApi(GENRES_URL);

  // Fetch recommendations using GetApi
  const { data, loading, error } = GetApi(RECOMMENDATIONS_URL);

  // Map genres to a dictionary
  useEffect(() => {
    if (genresData && genresData.genres) {
      const genreMap = genresData.genres.reduce((acc, genre) => {
        acc[genre.id] = genre.name;
        return acc;
      }, {});
      setGenres(genreMap);
    }
  }, [genresData]);

  if (loading)
    return (
      <div className="w-full h-full flex justify-items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  if (error || genresError) return <p>Error: {error || genresError}</p>;

  // Handle navigation to TV details page
  const handleNavigate = (title, id) => {
    const formattedTitle = title.replace(/\s+/g, "-").toLowerCase();
    navigate(`/tv/${formattedTitle}/${id}`); // Navigate to TV page
    window.location.reload();
  };

  return (
    <div className="p-2 md:p-0">
      <ul className="space-y-2">
        {data.results.map((recomend) => (
          <li
            key={recomend.id}
            className="flex gap-5 cursor-pointer hover:bg-[#3737372c] p-1"
            onClick={() => handleNavigate(recomend.name, recomend.id)} // Use TV show name for navigation
          >
            <img
              className="w-[180px] rounded-md"
              src={IMG_URL + recomend.backdrop_path}
              alt={recomend.name} // Use TV show name for alt text
            />
            <div className="flex flex-col">
              <span className="text-base font-semibold">{recomend.name}</span>{" "}
              {/* Use TV show name */}
              <span className="text-sm">
                {"First Air Date: " + recomend.first_air_date}
              </span>
              <span className="text-xs">
                {recomend.genre_ids
                  .map((id) => genres[id])
                  .filter(Boolean) // Remove undefined genres
                  .join(", ")}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Recommendations;
