import React from "react";
import { useSeasonEpisode } from "./SeasonEpisodeProvider";
import { GetApi } from "../../../custom-hooks/GetApi";
import Reviews from "./Reviews";
import { useParams } from "react-router-dom";

function EpisodeInfo() {
  const { id } = useParams();
  const { season, episode } = useSeasonEpisode();
  // Use the dynamic id instead of hardcoding
  const API_URL = `https://api.themoviedb.org/3/tv/${id}/season/${season}/episode/${episode}?language=en-US`;
  const { data, loading, error } = GetApi(API_URL);
  if (loading) return <span></span>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <div className="text-xl font-semibold text-white">
        Season {season}, Episode {episode} : {data.name}
      </div>

      {data.overview === "" ? (
        <div></div>
      ) : (
        <div className="p-3 mt-2 bg-[#272727] text-white rounded-md">
          {data.overview}
        </div>
      )}

      <Reviews />
    </div>
  );
}

export default EpisodeInfo;
