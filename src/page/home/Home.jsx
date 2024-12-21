import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Welcome to the Home Page</h1>
        <Link
          to="/movie"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Go to Movie Page
        </Link>
        <Link
          to="/tv"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Go to TV Show Page
        </Link>
      </div>
    </div>
  );
}

export default Home;
