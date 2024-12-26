import React, { useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import { IMG_URL } from "../../server/config";
function HomeCard({ img, name, date, id, type }) {
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

  return (
    <Link
      key={id}
      to={`/${type}/${(name || "unknown") // Fallback for undefined name
        .replace(/\s+/g, "-")
        .replace(/-/g, "-")
        .toLowerCase()}/${id}`}>
      <div className="relative flex flex-col gap-2 overflow-hidden">
        {/* Skeleton Loader for image - Shown until image is loaded */}
        {!isImageLoaded && !hasError && (
          <div className="skeleton rounded-md w-40  h-56 object-cover animate-pulse flex justify-center items-center text-center">
            <span className="animate-fade">
              <Loader />
            </span>
          </div>
        )}

        <img
          className={`rounded-md w-40  h-56 object-cover ${
            isImageLoaded ? "" : "hidden"
          }`}
          src={IMG_URL + img}
          alt={name}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />

        {!isImageLoaded && !hasError && (
          <div className="skeleton h-4 w-full animate-pulse"></div>
        )}

        <span className={`flex ${isImageLoaded ? "" : "hidden"}`}>
          <div className="text-xs font-semibold ml-1 whitespace-nowrap overflow-hidden text-ellipsis w-full">
            {name}
          </div>
        </span>
      </div>
    </Link>
  );
}

export default HomeCard;
