import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { GetApi } from "../../../custom-hooks/GetApi";
import Episode from "./Episode";
import { useSeasonEpisode } from "./SeasonEpisodeProvider";
import EpisodeInfo from "./EpisodeInfo";
import Recommendations from "./Recommendations";
import Cast from "./Cast";
import Reviews from "./Reviews";

function TVResult() {
  const { id } = useParams();
  const [activeSection, setActiveSection] = useState("episode");
  const { season, episode, seasons, setSeason } = useSeasonEpisode();

  // Check if the id is invalid
  if (!id) {
    return <p>Invalid Movie ID</p>;
  }

  const handleSeasonChange = (e) => {
    setSeason(Number(e.target.value)); // Update the season number
  };

  const API_URL = `https://api.themoviedb.org/3/tv/${id}?language=en-US`;
  const { data, loading, error } = GetApi(API_URL);

if (loading)
  return (
    <div className="w-full h-[100vh] flex justify-items-center justify-center">
      <span className="loading loading-spinner loading-lg"></span>
    </div>
  );
  if (error) return <p>Error: {error}</p>;

  // Map over genres to display the genre names
  const genresList = data.genres.map((genre) => genre.name).join(", ");

  return (
    <div className="md:p-10">
      <div className="lg:flex gap-8">
        <div>
          <div className="w-full flex justify-center">
            <div className="h-[250px] w-full md:h-[400px] md:w-[700px] lg:w-[800px] lg:h-[450px] rounded-lg p-2 md:p-0">
              <iframe
                className="w-full h-full rounded-md"
                src={`https://vidsrc.xyz/embed/tv?tmdb=${id}&season=${season}&episode=${episode}`}
                allow="fullscreen; autoplay;"
                allowFullScreen
                title="Embedded Video"></iframe>
            </div>
          </div>
          <div className="p-2 md:p-0 mt-2 md:flex gap-2 mb-2">
            <div className="lg:w-[800px]">
              <div>
                <EpisodeInfo id={id} />
              </div>
            </div>
          </div>
        </div>
        <div>
          <span className="flex gap-2 mb-5 px-2 md:px-0 overflow-auto ">
            <button
              className={`bg-[#292829] py-1 px-4 rounded-md ${
                activeSection === "episode"
                  ? "bg-slate-100 text-black"
                  : "text-white hover:bg-[#484748]"
              }`}
              onClick={() => setActiveSection("episode")}>
              Episode
            </button>
            <button
              className={`bg-[#292829] py-1 px-4 rounded-md ${
                activeSection === "overview"
                  ? "bg-slate-100 text-black"
                  : "text-white hover:bg-[#484748]"
              }`}
              onClick={() => setActiveSection("overview")}>
              Overview
            </button>

            <button
              className={`bg-[#292829] py-1 px-4 rounded-md ${
                activeSection === "recommendation"
                  ? "bg-slate-100 text-black"
                  : "text-white hover:bg-[#484748]"
              }`}
              onClick={() => setActiveSection("recommendation")}>
              Recommendation
            </button>
            <button
              className={`bg-[#292829] py-1 px-4 rounded-md ${
                activeSection === "cast"
                  ? "bg-slate-100 text-black"
                  : "text-white hover:bg-[#484748]"
              }`}
              onClick={() => setActiveSection("cast")}>
              Cast
            </button>
          </span>

          {/* Show the selected section */}
          {activeSection === "recommendation" && <Recommendations id={id} />}
          {activeSection === "cast" && <Cast id={id} />}
          {activeSection === "episode" && (
            <div className="p-2 md:p-0">
              <select
                className="select w-full  mb-2"
                onChange={handleSeasonChange}
                value={season}>
                {seasons.map((s) => (
                  <option key={s.season_number} value={s.season_number}>
                    Season {s.season_number}
                  </option>
                ))}
              </select>

              <Episode id={id} />
            </div>
          )}
          {activeSection === "overview" && (
            <div className="p-2 md:p-0 mt-2 md:flex gap-2">
              <div>
                <h3 className="font-bold my-2">{data.name}</h3>
                <p className="text-sm font-light">{data.overview}</p>
                <div>
                  <span>
                    <strong>Released: </strong>
                    <span className="font-light">{data.first_air_date}</span>
                  </span>
                </div>
                <div>
                  <span>
                    <strong>Genre: </strong>
                    <span className="font-light">{genresList}</span>
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="lg:hidden">
        <Reviews />
      </div>
    </div>
  );
}

export default TVResult;
