import React from "react";
import { GetApi } from "../../custom-hooks/GetApi";
import { useLocation } from "react-router-dom";
import { IMG_URL } from "../../server/config";
import Card2 from "../../shared/card/Card2";

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
    <div className="p-4 md:p-8 lg:p-12 xl:p-16">
      {/*       <h1>Search Results</h1>
      <p>Search Query: {searchQuery}</p>
 */}
      {data && data.results && data.results.length > 0 ? (
        <div>
          <h2>Results:</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-5">
            {data.results.map((result) => {
              // Select the correct name/title field based on result type
              const title = result.title || result.name;
              const date = result.release_date
                ? result.release_date.split("-")[0]
                : result.first_air_date
                ? result.first_air_date.split("-")[0]
                : ""; // Fallback to empty string if both are undefined

              const posterUrl = result.poster_path
                ? `${IMG_URL}${result.poster_path}`
                : "/path/to/default-image.jpg"; // Use a default image if no poster is available

              return (
                <Card2
                  key={result.id}
                  name={title}
                  date={date}
                  img={posterUrl}
                  id={result.id}
                  type={result.media_type}
                  country={result.origin_country}
                />
              );
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
