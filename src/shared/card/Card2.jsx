import React, { useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import { IMG_URL } from "../../server/config";

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

  const types = type === "tv" ? "TV Show" : "Movie"; // Fallback if type is missing

  return (
    <Link
      to={`/${type}/${encodeURIComponent(
        (name || "unknown") // Fallback for undefined name
          .replace(/\s+/g, "-") // Replace spaces with dashes
          .replace(/[^a-zA-Z0-9-]/g, "") // Remove unwanted characters
          .toLowerCase()
      )}/${id}`}>
      <div className="relative flex flex-col gap-1 overflow-hidden">
        {/* Skeleton Loader for image - Shown until image is loaded */}
        {!isImageLoaded && !hasError && (
          <div className="skeleton rounded-md w-52 h-72 animate-pulse flex justify-center items-center text-center">
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
          src={IMG_URL + img}
          alt={name}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />

        {/* Movie/TV Show name and details */}
        <span>
          <div className="text-xs font-semibold whitespace-nowrap overflow-hidden text-ellipsis w-full">
            {/* Display name without skeleton if image is loaded */}
            {isImageLoaded ? (
              <div>{name || "Unknown Title"}</div>
            ) : (
              <div className="skeleton h-3 w-full animate-pulse mb-1"></div>
            )}

            {isImageLoaded ? (
              <div>
                {types}
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
            ) : (
              <div className="skeleton h-3 w-full animate-pulse"></div>
            )}
          </div>
        </span>
      </div>
    </Link>
  );
}

export default Card2;
