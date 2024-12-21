import React from "react";
import { GetApi } from "../../../custom-hooks/GetApi";
import { IMG_URL } from "../../../server/config";

function Cast({ id }) {
  const API_URL = `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`;
  const { data, loading, error } = GetApi(API_URL);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <span>
        <ul className="space-y-2">
          {data.cast.map((cast, index) => (
            <li
              key={index}
              className="flex justify-items-center place-items-center gap-2">
              <img
                className="w-16 rounded-lg"
                src={IMG_URL + cast.profile_path}
                alt=""
              />
              <div>
                <div className="text-sm"> {cast.name}</div>
                <div className="text-xs"> {cast.character}</div>
                <div className="text-xs"> {cast.known_for_department}</div>
              </div>
            </li>
          ))}
        </ul>
      </span>
    </div>
  );
}

export default Cast;
