import React from "react";
import { GetApi } from "../../../custom-hooks/GetApi";
import HomeCard from "../../../shared/card/HomeCard";
import Loader from "../../../components/Loader"; // Assuming Loader is your skeleton loader component

function PopTV() {
  const API_URL =
    "https://api.themoviedb.org/3/tv/popular?language=en-US&page=1";
  const { data, error } = GetApi(API_URL);

  if (error) return <p>Error: {error}</p>;

  // If data is still being fetched, show skeleton loader
  if (!data) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
        {/* Show skeleton loader for each card */}
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="skeleton  w-40  h-56  rounded-md animate-pulse">
            <Loader />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
      {data.results.slice(12, 18).map((movie) => (
        <HomeCard
          key={movie.id}
          name={movie.title || movie.name}
          img={movie.poster_path}
          id={movie.id}
          type={"tv"}
        />
      ))}
    </div>
  );
}

export default PopTV;
