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
    <div>
      <div className="grid grid-cols-5 gap-5">
        {data.results.map((movie) => (
          <Card1 key={movie.id} name={movie.title} img={movie.poster_path} id={movie.id} type={"movie"} />
        ))}
      </div>
    </div>
  );
};

export default Movie;
