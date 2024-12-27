import React from "react";
import "boxicons";
import { Link } from "react-router-dom";
import { GetApi } from "../custom-hooks/GetApi";
import Card1 from "../shared/card/Card1";

const Search = () => {
  const { data, error } = GetApi(
    "https://api.themoviedb.org/3/trending/all/day?language=en-US"
  );

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="p-2">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-4">Top Search</h1>
</div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {data?.results.map((movie) => (
          <Card1
            key={movie.id}
            id={movie.id}
            name={movie.title || movie.name}
            img={movie.poster_path}
            type={movie.media_type}
          />
        ))}
      </div>
    </div>
  );
};

export default Search;
