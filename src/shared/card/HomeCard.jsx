import React, { useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import { IMG_URL } from "../../server/config";

// Constant for Skeleton Loader
const SkeletonLoader = () => (
  <div className="skeleton rounded-md w-52 h-72 object-cover animate-pulse flex justify-center items-center text-center">
    <span className="animate-fade">
      <Loader />
    </span>
  </div>
);

function HomeCard({ img, name, date, id, type }) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Handles image load success
  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  // Handles image load failure
  const handleImageError = () => {
    setHasError(true); // Set error state if image fails to load
    setIsImageLoaded(true); // Hide skeleton loader even on error
  };

  return (
    <Link
      key={id}
      to={`/${type}/${(name || "unknown")
        .replace(/\s+/g, "-")
        .replace(/-/g, "-")
        .toLowerCase()}/${id}`}>
      <div className="relative flex flex-col gap-2">
        {/* Show Skeleton Loader while image is loading */}
        {!isImageLoaded && !hasError && <SkeletonLoader />}

        {/* Image with conditional rendering */}
        <img
          className={`rounded-md w-52 h-72 object-cover ${
            isImageLoaded ? "" : "hidden"
          }`}
          src={IMG_URL + img}
          alt={name || "Movie Image"}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />

        {/* Title skeleton while loading */}
        {!isImageLoaded && !hasError && (
          <div className="skeleton h-4 w-full animate-pulse"></div>
        )}

        {/* Title (visible after image is loaded or if there's an error) */}
        <span className={`flex ${isImageLoaded || hasError ? "" : "hidden"}`}>
          <div className="text-xs font-semibold ml-1 whitespace-nowrap overflow-hidden text-ellipsis w-full">
            {name || "Unknown Title"}
          </div>
        </span>
      </div>
    </Link>
  );
}

export default HomeCard;
