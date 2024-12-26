import React from "react";
import { GetApi } from "../../../custom-hooks/GetApi";
import HomeCard from "../../../shared/card/HomeCard";

function TrendTV() {
  const API_URL = "https://api.themoviedb.org/3/trending/tv/day?language=en-US";
  const { data, loading, error } = GetApi(API_URL);

  if (loading) return;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
        {data.results.slice(6, 12).map((movie) => (
          <HomeCard
            key={movie.id}
            name={movie.title || movie.name}
            img={movie.poster_path}
            id={movie.id}
            type={movie.media_type}
          />
        ))}
      </div>
    </div>
  );
}
export default TrendTV;
