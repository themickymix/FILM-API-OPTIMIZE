import React from "react";
import Carousel from "./Carousel";
import Scroll from "./Scroll";
import Movie from "./Movie";
import TV from "./TV";

function Home() {
  return (
    <div className="p-2 md:px-[10%]">
      <div>
        <div className="hidden md:block">
          <Scroll />
        </div>

        <div className="md:hidden">
          <Carousel />
        </div>
      </div>
      <Movie />
      <TV />
    </div>
  );
}

export default Home;
