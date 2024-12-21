import React from "react";
import { GetApi } from "../../custom-hooks/GetApi";
import { useLocation } from "react-router-dom";
import Card1 from "../../shared/card/Card1";
import { IMG_URL } from "../../server/config";

function SearchQuery() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("search");

  if (!searchQuery) {
    return <p>Please enter a search term in the query parameter.</p>;
  }

  const API_URL = `https://api.themoviedb.org/3/search/multi?query=${searchQuery}&include_adult=false&language=en-US&page=1`;
  const { data, error, isLoading } = GetApi(API_URL);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching data: {error.message}</p>;
  }

  return (
    <div>
{/*       <h1>Search Results</h1>
      <p>Search Query: {searchQuery}</p>
 */}
      {data && data.results && data.results.length > 0 ? (
        <div>
          <h2>Results:</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {data.results.map((result) => {
              // Select the correct name/title field based on result type
              const title = result.title || result.name;
              const posterUrl = result.poster_path
                ? `${IMG_URL}${result.poster_path}`
                : "/path/to/default-image.jpg"; // Use a default image if no poster is available

              return <Card1 key={result.id} name={title} img={posterUrl} id={result.id} type={result.media_type} />;
            })}
          </div>
        </div>
      ) : (
        <p>No results found for "{searchQuery}".</p>
      )}
    </div>
  );
}

export default SearchQuery;
