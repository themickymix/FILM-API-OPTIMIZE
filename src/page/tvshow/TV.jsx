import React from "react";
import { GetApi } from "../../custom-hooks/GetApi";
import Card1 from "../../shared/card/Card1";

const TV = () => {
  const API_URL =
    "https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc";
  const { data, loading, error } = GetApi(API_URL);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <div className="grid grid-cols-5 gap-5">
        {data.results.map((tv) => (
          <Card1
            key={tv.id}
            name={tv.name}
            img={tv.poster_path}
            id={tv.id}
            type={"tv"}
          />
        ))}
      </div>
    </div>
  );
};

export default TV;
