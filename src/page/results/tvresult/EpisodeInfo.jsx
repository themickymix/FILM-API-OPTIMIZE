import React, { useState } from "react";
import { useSeasonEpisode } from "./SeasonEpisodeProvider";
import { GetApi } from "../../../custom-hooks/GetApi";
import Reviews from "./Reviews";
import { useParams } from "react-router-dom";

function EpisodeInfo() {
  const { id } = useParams();
  const { season, episode } = useSeasonEpisode();
  const [isOverviewVisible, setIsOverviewVisible] = useState(true);
  // Use the dynamic id instead of hardcoding
  const API_URL = `https://api.themoviedb.org/3/tv/${id}/season/${season}/episode/${episode}?language=en-US`;
  const { data, loading, error } = GetApi(API_URL);
  if (loading) return <span></span>;
  if (error) return <p>Error: {error}</p>;

  const toggleOverviewVisibility = () => {
    setIsOverviewVisible(!isOverviewVisible);
  };
  if (!data.overview === "") {
    return data.overview;
  }
  return (
    <div>
      <div className="text-xl font-semibold text-white">
        Season {season}, Episode {episode} : {data.name}
      </div>
      {data.overview && (
        <div className="p-3 mt-2 bg-[#272727] text-white rounded-md hidden lg:block">
          {data.overview}
        </div>
      )}

      <div className="lg:hidden" onClick={toggleOverviewVisibility}>
        {isOverviewVisible ? (
          <div className="p-3 mt-2 bg-[#272727] text-white rounded-md cursor-pointer whitespace-nowrap overflow-hidden text-ellipsis md:w-[700px]">
            {data.overview}
          </div>
        ) : (
          <div className="p-3 mt-2 bg-[#272727] text-white rounded-md cursor-pointer ">
            {data.overview}
          </div>
        )}
      </div>

      <div className="hidden lg:block">
        <Reviews />
      </div>
    </div>
  );
}

export default EpisodeInfo;
