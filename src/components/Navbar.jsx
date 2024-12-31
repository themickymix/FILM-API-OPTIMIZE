import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FilmContext } from "../FilmProvider";

function Navbar() {
  const [query, setQuery] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [activeLink, setActiveLink] = useState(""); // Add this line to define activeLink state
  const navigate = useNavigate();
  const location = useLocation();
  const { filmTitle } = useContext(FilmContext);

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (query.trim()) {
        navigate(`/results?search=${query}`);
        setQuery("");
      }
      setIsSearchVisible(false);
    }
  };

  const handleLinkClick = () => {
    setIsSidebarOpen(false);
    setIsSearchVisible(false);
  };

  const handleSearchClick = () => {
    navigate("/search");
    setIsSearchVisible(true);
  };

  useEffect(() => {
    // Update active link based on the current pathname
    if (location.pathname === "/") {
      setIsSearchVisible(false);
      setActiveLink("Home");
    } else if (location.pathname === "/movie") {
      setIsSearchVisible(false);
      setActiveLink("Movie"); // Fixed typo here
    } else if (location.pathname === "/tv") {
      setIsSearchVisible(false);
      setActiveLink("TV Shows");
    } else if (location.pathname === "/search") {
      setIsSearchVisible(true);
      setActiveLink("Search");
    } else if (location.pathname === "/results") {
      setIsSearchVisible(true);
setActiveLink("");


    } else {
      setActiveLink(filmTitle || ""); // Set active link to filmTitle or "Home" as default
      setIsSearchVisible(false);
    }
  }, [location.pathname, filmTitle]);

  return (
    <div className="navbar bg-base-100  ">
      <div className="flex-none">
        <div className="drawer">
          <input
            id="my-drawer"
            type="checkbox"
            className="drawer-toggle"
            checked={isSidebarOpen}
            onChange={() => setIsSidebarOpen(!isSidebarOpen)}
          />
          <div className="drawer-content">
            <label
              htmlFor="my-drawer"
              className="btn btn-primary drawer-button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-5 w-5 stroke-current">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </label>
          </div>
          <div className="drawer-side z-50">
            <label
              htmlFor="my-drawer"
              aria-label="close sidebar"
              className="drawer-overlay"></label>
            <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
              <li>
                <Link to="/" onClick={handleLinkClick}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/movie" onClick={handleLinkClick}>
                  Movie
                </Link>
              </li>
              <li>
                <Link to="/tv" onClick={handleLinkClick}>
                  TV Shows
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className=" w-1/2">
        <div className="ml-1 whitespace-nowrap overflow-hidden text-ellipsis w-full">
          {activeLink}
        </div>
      </div>

      {!isSearchVisible && (
        <div className="flex-1 flex justify-end">
          <button className="flex" onClick={handleSearchClick}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-6 w-6 animate-wiggle animate-infinite">
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      )}

      {isSearchVisible && (
        <div className="flex-1 flex justify-end">
          <label className="input input-bordered flex items-center w-full md:w-1/4 animate-fade-left">
            <input
              type="text"
              className="grow focus:outline-none focus:ring-0"
              placeholder="Search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleSearch}
              autoFocus
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70">
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>
        </div>
      )}
    </div>
  );
}

export default Navbar;
