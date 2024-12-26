import React from "react";
import { GetApi } from "../../../custom-hooks/GetApi";
import Card1 from "../../../shared/card/Card1";

function Trending() {
  const API_URL =
    "https://api.themoviedb.org/3/trending/all/day?language=en-US";
  const { data, loading, error } = GetApi(API_URL);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
        {data.results.map((movie) => (
          <Card1
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
export default Trending;
