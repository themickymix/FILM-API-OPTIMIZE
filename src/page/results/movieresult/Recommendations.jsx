import React, { useState, useEffect } from "react";
import { IMG_URL } from "../../../server/config";
import { GetApi } from "../../../custom-hooks/GetApi";
import { useNavigate } from "react-router-dom";

function Recommendations({ id }) {
  const navigate = useNavigate();
  const [genres, setGenres] = useState({});
  const GENRES_URL = `https://api.themoviedb.org/3/genre/movie/list?language=en-US`;
  const RECOMMENDATIONS_URL = `https://api.themoviedb.org/3/movie/${id}/recommendations?language=en-US&page=1`;

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

  if (loading || genresLoading) return <p>Loading...</p>;
  if (error || genresError) return <p>Error: {error || genresError}</p>;

  const handleNavigate = (title, id) => {
    const formattedTitle = title.replace(/\s+/g, "-").toLowerCase();
    // Navigate and reload the page
    navigate(`/movie/${formattedTitle}/${id}`);
    window.location.reload(); // Forces the page to reload
  };

  return (
    <div className="p-2 md:p-0">
      <ul className="space-y-2">
        {data.results.map((recomend) => (
          <li
            key={recomend.id}
            className="flex gap-5 cursor-pointer"
            onClick={() => handleNavigate(recomend.title, recomend.id)}>
            <img
              className="w-[180px] rounded-md"
              src={IMG_URL + recomend.backdrop_path}
              alt={recomend.title}
            />
            <div className="flex flex-col">
              <span className="text-base font-semibold">{recomend.title}</span>
              <span className="text-sm">
                {"Released: " + recomend.release_date}
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
