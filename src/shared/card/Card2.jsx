import React, { useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import { IMG_URL } from "../../server/config";

// Fallback image URL
const fallbackImage = "https://placehold.co/400x600?text=No+Image";

function Card2({ img, name, date, id, type, country }) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [hasError, setHasError] = useState(false); // Handle image load errors

  // Handles image load success
  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  // Handles image load failure
  const handleImageError = () => {
    setHasError(true); // Set error state if image fails to load
    setIsImageLoaded(true); // Hide skeleton loader even on error
  };

  const types = type === "tv" ? " TV Show" : " Movie";

  return (
    <Link
      key={id}
      to={`/${type}/${(name || "unknown") // Fallback for undefined name
        .replace(/\s+/g, "-")
        .replace(/-/g, "-")
        .toLowerCase()}/${id}`}>
      <div className="relative flex flex-col gap-2">
        {/* Skeleton Loader for image - Shown until image is loaded */}
        {!isImageLoaded && !hasError && (
          <div className="skeleton rounded-md w-52 h-72 object-cover animate-pulse flex justify-center items-center text-center">
            <span className="animate-fade">
              <Loader />
            </span>
          </div>
        )}

        {/* Image */}
        <img
          className={`rounded-md w-52 h-72 object-cover ${
            isImageLoaded ? "" : "hidden"
          }`}
          src={hasError ? fallbackImage : IMG_URL + img} // Use fallback image on error
          alt={name}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />

        {/* Skeleton for title */}
        {!isImageLoaded && !hasError && (
          <div className="skeleton h-4 w-full animate-pulse"></div>
        )}

        {/* Movie/TV Show name and details */}
        <span>
          <div className="text-xs font-semibold whitespace-nowrap overflow-hidden text-ellipsis w-full">
            <div>{name || "Unknown Title"}</div>
            {/* Display a fallback for undefined name */}
            {types + " "}
            {date && (
              <span>
                <span className="font-normal text-gray-500">&bull;</span>
                {" " + date + " "}
              </span>
            )}
            {country && (
              <span>
                <span className="font-normal text-gray-500">&bull;</span>
                {" " + country}
              </span>
            )}
          </div>
        </span>
      </div>
    </Link>
  );
}

export default Card2;
