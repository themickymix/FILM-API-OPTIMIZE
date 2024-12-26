import React, { useState } from "react";
import Loader from "../../components/Loader";
import { IMG_URL } from "../../server/config";

const CastCard = ({ name, chart, img }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  const handleImageError = () => {
    setHasError(true);
    setIsImageLoaded(true); // Hide skeleton loader even on error
  };

  return (
    <div className="relative flex flex-col gap-2 p-2 rounded-md min-w-[150px] max-w-xs sm:min-w-[200px] sm:max-w-sm md:min-w-[250px] md:max-w-md lg:min-w-[300px] lg:max-w-lg xl:min-w-[350px] xl:max-w-xl">
      {/* Skeleton Loader for image - Shown until image is loaded */}
      {!isImageLoaded && !hasError && (
        <div className="skeleton h-72 rounded-md animate-pulse flex justify-center items-center text-center">
          <span className="animate-fade">
            <Loader />
          </span>
        </div>
      )}

<span className="flex justify-items-center gap-3">
      <img
        className={`rounded-md w-12 object-cover ${
          isImageLoaded ? "" : "hidden"
        }`}
        src={hasError ? "/path/to/fallback-image.jpg" : IMG_URL+ img} // Fallback image if error occurs
        alt={name}
        onLoad={handleImageLoad}
        onError={handleImageError}
      />

      <div>
        <div className="text-sm">{name}</div>
        <div className="text-xs">{chart}</div>
      </div></span>
    </div>
  );
};

export default CastCard;
