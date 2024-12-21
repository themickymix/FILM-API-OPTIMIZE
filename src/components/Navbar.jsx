import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

const handleSearch = (e) => {
  if (e.key === "Enter") {
    e.preventDefault(); // Prevent form submission on Enter key
    if (query.trim()) {
      // Navigate to results page with search query
      navigate(`/results?search=${query}`);
      setQuery(""); // Reset the query input field after search
    }
  }
};
  return (
    <div className="navbar bg-base-100">
      <div className="flex-none">
        <button className="btn btn-square btn-ghost">
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
        </button>
        img
      </div>

      {/* Centered Search Input */}
      <div className="flex-1 flex justify-center">
        <label className="input input-bordered flex items-center w-full md:w-1/4">
          <input
            type="text"
            className="grow"
            placeholder="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleSearch}
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

      {/*   <div className="flex-none">
        <a className="btn btn-ghost text-xl">daisyUI</a>
      </div> */}
    </div>
  );
}

export default Navbar;
