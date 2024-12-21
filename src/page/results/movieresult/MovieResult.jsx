import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GetApi } from "../../../custom-hooks/GetApi";
import Recommendations from "./Recommendations";
import Cast from "./Cast";

function MovieResult() {
  const { id } = useParams();
  const [activeSection, setActiveSection] = useState("overview");

  // Update default section based on screen size
  useEffect(() => {
    const updateActiveSection = () => {
      if (window.innerWidth >= 768) {
        setActiveSection("recommendation");
      } else {
        setActiveSection("overview");
      }
    };

    // Set the initial state
    updateActiveSection();

    // Add event listener to handle window resize
    window.addEventListener("resize", updateActiveSection);

    // Cleanup listener on component unmount
    return () => window.removeEventListener("resize", updateActiveSection);
  }, []);

  // Check if the id is invalid
  if (!id) {
    return <p>Invalid Movie ID</p>;
  }

  const API_URL = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
  const { data, loading, error } = GetApi(API_URL);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  // Map over genres to display the genre names
  const genresList = data.genres.map((genre) => genre.name).join(", ");

  // Function to handle section toggle
  const handleSectionToggle = (section) => {
    setActiveSection(section);
  };

  return (
    <div className="md:p-10">
      <div className="lg:flex gap-8">
        <div>
          <div className="w-full flex justify-center">
            <div className="h-[250px] w-full md:h-[400px] md:w-[700px] lg:w-[800px] lg:h-[450px] rounded-lg p-2 md:p-0">
              <iframe
                className="w-full h-full rounded-md"
                src={`https://vidsrc.xyz/embed/movie/${id}`}
                allow="fullscreen; autoplay;"
                allowFullScreen
                title="Embedded Video"></iframe>
            </div>
          </div>
          <div className="p-2 md:p-0 mt-2 md:flex gap-2 hidden mb-10">
            <div className="w-[800px]">
              <span className="text-xl font-semibold">{data.title}</span>
              <p className="text-sm font-light">{data.overview}</p>
              <div>
                <span>
                  <strong>Released: </strong>
                  <span className="font-light">{data.release_date}</span>
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
        </div>
        <div>
          <span className="flex gap-4 mb-5 px-2 md:px-0">
            <button
              className={`bg-[#292829]   py-1 px-4 rounded-md md:hidden ${
                activeSection === "overview"
                  ? "bg-slate-100 text-black"
                  : "text-white hover:bg-[#484748]"
              }`}
              onClick={() => handleSectionToggle("overview")}>
              Overview
            </button>

            <button
              className={`bg-[#292829]   py-1 px-4 rounded-md ${
                activeSection === "recommendation"
                  ? "bg-slate-100 text-black"
                  : "text-white hover:bg-[#484748]"
              }`}
              onClick={() => handleSectionToggle("recommendation")}>
              Recommendation
            </button>
            <button
              className={`bg-[#292829]   py-1 px-4 rounded-md ${
                activeSection === "cast"
                  ? "bg-slate-100 text-black"
                  : "text-white hover:bg-[#484748]"
              }`}
              onClick={() => handleSectionToggle("cast")}>
              Cast
            </button>
          </span>

          {/* Show the selected section */}
          {activeSection === "recommendation" && <Recommendations id={id} />}
          {activeSection === "cast" && <Cast id={id} />}
          {activeSection === "overview" && (
            <div className="p-2 md:p-0 mt-2 md:flex gap-2">
              <div>
                <span className="text-xl font-semibold">{data.title}</span>
                <p className="text-sm font-light">{data.overview}</p>
                <div>
                  <span>
                    <strong>Released: </strong>
                    <span className="font-light">{data.release_date}</span>
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
    </div>
  );
}

export default MovieResult;
