import { BrowserRouter, Routes, Route } from "react-router-dom";
import Movie from "./page/movie/Movie";
import FilmResult from "./page/results/FilmResult";
import MovieResult from "./page/results/movieresult/MovieResult";
import TV from "./page/tvshow/TV";
import Home from "./page/home/Home";
import Navbar from "./components/Navbar";
import SearchQuery from "./page/results/SearchQuery";
import Search from "./page/Search";

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie" element={<Movie />} />
        <Route path="/tv" element={<TV />} />
        <Route path="/movie/:name/:id" element={<FilmResult />} />
        <Route path="/tv/:name/:id" element={<FilmResult />} />
        <Route path="/results" element={<SearchQuery />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
