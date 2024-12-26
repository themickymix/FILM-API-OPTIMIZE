import React, { useState } from "react";
import { Link } from "react-router-dom";
import Trending from "./trendings/Trending";
import TrendMovie from "./trendings/TrendMovie";
import TrendTV from "./trendings/TrendTV";
import PopMovie from "./popular/PopMovie";
import PopTV from "./popular/PopTV";

function Home() {
  const [activeTrending, setActiveTrending] = useState("movie");
  const [activePopular, setActivePopular] = useState("movie");

  // Function to handle button click for trending section
  const handleTrendingClick = (button) => {
    setActiveTrending(button);
  };

  // Function to handle button click for popular section
  const handlePopularClick = (button) => {
    setActivePopular(button);
  };

  return (
    <div className="">
      {/* Trending Section */}
      <span className="flex justify-between items-center w-full px-5 md:px-[15%]">
        <span className="font-bold">Trending</span>
        <span className="flex">
          <button
            onClick={() => handleTrendingClick("movie")}
            className={`${
              activeTrending === "movie" ? " text-purple-500" : " text-white"
            } px-4 py-2 rounded-md`}>
            Movie
          </button>
          <button
            onClick={() => handleTrendingClick("tv")}
            className={`${
              activeTrending === "tv" ? " text-purple-500" : " text-white"
            } px-4 py-2 rounded-md`}>
            TV Show
          </button>
        </span>
      </span>
      <div className="px-12 md:px-[15%]">
        {activeTrending === "movie" ? <TrendMovie /> : <TrendTV />}
      </div>

      {/* Popular Section */}
      <span className="flex justify-between items-center w-full px-5 md:px-[15%] mt-20">
        <span className="font-bold ">Popular</span>
        <span className="flex">
          <button
            onClick={() => handlePopularClick("movie")}
            className={`${
              activePopular === "movie" ? " text-purple-500" : " text-white"
            } px-4 py-2 rounded-md`}>
            Movie
          </button>
          <button
            onClick={() => handlePopularClick("tv")}
            className={`${
              activePopular === "tv" ? " text-purple-500" : " text-white"
            } px-4 py-2 rounded-md`}>
            TV Show
          </button>
        </span>
      </span>
      <div className="px-12 md:px-[15%]">
        {activePopular === "movie" ? <PopMovie /> : <PopTV />}
      </div>
    </div>
  );
}

export default Home;
