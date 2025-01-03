import React, { useState, useEffect } from "react";
import { GetApi } from "../../../custom-hooks/GetApi";
import { useSeasonEpisode } from "./SeasonEpisodeProvider";
import { IMG_URL } from "../../../server/config";

function Episode({ id }) {
  const { season, setEpisode, episode } = useSeasonEpisode();
  const [activeEpisode, setActiveEpisode] = useState(episode);
  const API_URL = `https://api.themoviedb.org/3/tv/${id}/season/${season}?language=en-US`;
  const { data, loading } = GetApi(API_URL);

  // Handle setting the active episode
  const handleEpisodeClick = (episodeNumber) => {
    setActiveEpisode(episodeNumber);
    setEpisode(episodeNumber);
      window.scrollTo({
        top: 0,
        behavior: "smooth", // Smooth scroll effect
      });
  };

  if (loading)
    return (
      <div className="w-full h-full flex justify-items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );

  return (
    <div>
      {/* Episodes List */}
      <ul className="space-y-3">
        {data?.episodes?.map((ep) => {
          const formattedDate = new Date(ep.air_date).toLocaleDateString(
            "en-US",
            {
              month: "long",
              day: "numeric",
              year: "numeric",
            }
          );
          return (
            <li
              className={`cursor-pointer hover:bg-[#212325] p-2 rounded-md ${
                ep.episode_number === activeEpisode
                  ? "bg-[#242628] text-white"
                  : ""
              }`}
              key={ep.id}
              onClick={() => handleEpisodeClick(ep.episode_number)}>
              <span className="flex gap-4">
                {/* Conditionally display image if it exists */}
                <div className="relative w-[260px] md:w-40">
                  {ep.still_path ? (
                    <img
                      className="rounded-md"
                      src={IMG_URL + ep.still_path}
                      alt={ep.name}
                    />
                  ) : (
                    <div className=" rounded-md bg-gray-300 flex items-center justify-center">
                      <img
                        className="rounded-md"
                        src={"https://placehold.co/600x400?text=No+Image"}
                        alt=""
                      />
                    </div>
                  )}
                  <span className="absolute text-stroke-sm flex bottom-0 text-black p-2 font-bold text-2xl shadow-lg">
                    {ep.episode_number}
                  </span>
                </div>

                <div className="whitespace-nowrap overflow-hidden w-full md:w-96">
                  <div className="text-sm font-semibold overflow-hidden text-ellipsis">
                    {ep.name}
                  </div>
                  <div className="text-xs">{formattedDate}</div>
                  <div className="text-xs">
                    {ep.runtime ? `${ep.runtime + " Minutes"}` : ""}
                  </div>
                </div>
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Episode;
