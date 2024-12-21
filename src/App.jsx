import { BrowserRouter, Routes, Route } from "react-router-dom";
import Movie from "./page/movie/Movie";
import FilmResult from "./page/results/FilmResult";
import MovieResult from "./page/results/movieresult/MovieResult";
import TV from "./page/tvshow/TV";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/movie" element={<Movie />} />
        <Route path="/tv" element={<TV />} />
        <Route path="/movie/:name/:id" element={<FilmResult />} />
        <Route path="/tv/:name/:id" element={<FilmResult />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
