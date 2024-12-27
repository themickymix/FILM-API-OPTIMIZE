import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { GetApi } from "../../custom-hooks/GetApi";
import "boxicons";

function Scroll() {
  const { data, error } = GetApi(
    "https://api.themoviedb.org/3/trending/all/day?language=en-US"
  );
  const scrollRef = useRef(null);
  const [showPrev, setShowPrev] = useState(false); // To manage the visibility of the previous button
  const [showNext, setShowNext] = useState(true); // To manage the visibility of the next button

  const handlePrev = () => {
    scrollRef.current.scrollBy({
      top: 0,
      left: -scrollRef.current.clientWidth,
      behavior: "smooth",
    });
    setShowNext(true); // Show the next button when scrolling to the left
  };

  const handleNext = () => {
    scrollRef.current.scrollBy({
      top: 0,
      left: scrollRef.current.clientWidth,
      behavior: "smooth",
    });
    setShowPrev(true); // Show the previous button when scrolling to the right
  };

  // Check if the scroll position is at the beginning or end
  const handleScroll = () => {
    if (scrollRef.current.scrollLeft === 0) {
      setShowPrev(false); // Hide previous button when at the start
    } else {
      setShowPrev(true); // Show previous button when not at the start
    }

    if (
      scrollRef.current.scrollLeft + scrollRef.current.clientWidth >=
      scrollRef.current.scrollWidth
    ) {
      setShowNext(false); // Hide next button when at the end
    } else {
      setShowNext(true); // Show next button when not at the end
    }
  };

  // Add event listener for scroll position updates
  React.useEffect(() => {
    const scrollElement = scrollRef.current;
    scrollElement.addEventListener("scroll", handleScroll);
    return () => scrollElement.removeEventListener("scroll", handleScroll);
  }, []);

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="relative">
      {showPrev && (
        <button
          className="absolute left-0 z-10 p-2 bg-gray-500 hover:bg-gray-600 rounded-full h-10 w-10 ml-2 text-white transform -translate-y-1/2 top-1/2"
          onClick={handlePrev}>
          <box-icon name="chevron-left" color="#ffffff"></box-icon>
        </button>
      )}
      <div ref={scrollRef} className="flex overflow-x-hidden space-x-4 mx-8">
        {data?.results.slice(0, 10).map((item, index) => {
          const type = item.media_type;
          const name = item.title || item.name || "unknown";
          const id = item.id;

          const formattedName = name
            .replace(/\s+/g, "-")
            .replace(/-/g, "-")
            .toLowerCase();

          const path = `/${type}/${formattedName}/${id}`;

          return (
            <Link
              to={path}
              key={item.id}
              className="flex-shrink-0 w-48 relative">
              <img
                src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                alt={name}
                className="w-full h-auto rounded-lg"
              />
              <div className="absolute text-stroke bottom-0 text-black pb-6 pr-8 text-8xl font-bold">
                {index + 1}
              </div>
            </Link>
          );
        })}
      </div>
      {showNext && (
        <button
          className="absolute right-0 z-10 p-2 text-shadows bg-gray-500 hover:bg-gray-600 rounded-full h-10 w-10 mr-2 text-white transform -translate-y-1/2 top-1/2"
          onClick={handleNext}>
          <box-icon name="chevron-right" color="#ffffff"></box-icon>
        </button>
      )}
    </div>
  );
}

export default Scroll;
