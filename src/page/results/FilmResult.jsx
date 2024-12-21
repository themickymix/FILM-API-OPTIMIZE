import React from "react";
import MovieResult from "./movieresult/MovieResult";
import TVResults from "./tvresult/TVResults";
import { useLocation } from "react-router-dom";
import App from "./tvresult/App";

function FilmResult() {
  const location = useLocation();
  const pathname = location.pathname;
  const part = pathname.split("/");
  const type = part[1];

  return (
    <div>
      {type === "movie" ? (
        <MovieResult />
      ) : type === "tv" ? (
        <App />
      ) : (
        <div>Invalid type</div>
      )}
    </div>
  );
}

export default FilmResult;
