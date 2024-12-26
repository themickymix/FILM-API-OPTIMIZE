import React from "react";
import { GetApi } from "../../../custom-hooks/GetApi";
import HomeCard from "../../../shared/card/HomeCard";

function PopMovie() {
  const API_URL =
    "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";
  const { data, loading, error } = GetApi(API_URL);

  if (loading) return <p></p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
        {data.results.slice(12, 18).map((movie) => (
          <HomeCard
            key={movie.id}
            name={movie.title || movie.name}
            img={movie.poster_path}
            id={movie.id}
            type={"movie"}
          />
        ))}
      </div>
    </div>
  );
}
export default PopMovie;
