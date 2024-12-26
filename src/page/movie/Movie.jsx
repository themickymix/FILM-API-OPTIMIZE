import React from "react";
import { GetApi } from "../../custom-hooks/GetApi";
import Card1 from "../../shared/card/Card1";

const Movie = () => {
  const API_URL =
    "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc";
  const { data, loading, error } = GetApi(API_URL);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-4 md:p-8 lg:p-12 xl:p-16">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
        {data.results.map((movie) => (
          <Card1
            key={movie.id}
            name={movie.title}
            img={movie.poster_path}
            id={movie.id}
            type={"movie"}
          />
        ))}
      </div>
    </div>
  );
};

export default Movie;
