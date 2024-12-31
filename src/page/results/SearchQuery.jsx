import React, { useContext, useEffect, useState } from "react";
import { GetApi } from "../../custom-hooks/GetApi";
import { useLocation } from "react-router-dom";
import { IMG_URL } from "../../server/config";
import Card2 from "../../shared/card/Card2";
import { FilmContext } from "../../FilmProvider";

function SearchQuery() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("search");
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const { setFilmTitle } = useContext(FilmContext);
  if (!searchQuery) {
    return <p>Please enter a search term in the query parameter.</p>;
  }

  const API_URL = `https://api.themoviedb.org/3/search/multi?query=${searchQuery}&include_adult=false&language=en-US&page=${page}`;
  const { data, error, isLoading } = GetApi(API_URL);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching data: {error.message}</p>;
  }

  useEffect(() => {
    if (data?.total_pages) {
      setMaxPage(data.total_pages); // Set max pages from API response
    }
  }, [data]);

  const handlePageChange = (newPage) => {
    if (newPage === page) return;
    setPage(newPage);
  };

  useEffect(() => {
   setFilmTitle(searchQuery);
  }, [searchQuery]); // Make sure to include setFilmTitle as a dependency

  return (
    <div className="p-4 md:p-8 lg:p-12 xl:p-16">
      {/* Render pagination only if there are multiple pages */}
      {maxPage > 1 && (
        <div
          className="join my-5"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
          }}>
          {page > 1 && (
            <div
              className="rounded-full h-8 w-8 hover:bg-base-200 flex items-center justify-center cursor-pointer"
              onClick={() => handlePageChange(Math.max(page - 1, 1))}>
              ←
            </div>
          )}

          {/* Dynamically Render Page Buttons */}
          {[...Array(3)].map((_, index) => {
            const p = page === 1 ? index + 1 : page - 1 + index; // Adjust range based on current page
            return (
              <div
                key={p}
                className={`rounded-full h-10 w-10 text-sm flex items-center justify-center ${
                  p === page
                    ? "bg-purple-500 text-white"
                    : "transparent h-8 w-8 hover:bg-base-200"
                }`}
                onClick={() => handlePageChange(p)}
                style={{
                  cursor: p > 0 && p <= maxPage ? "pointer" : "default",
                  pointerEvents: p > 0 && p <= maxPage ? "auto" : "none",
                }}>
                {p}
              </div>
            );
          })}

          {page < maxPage && (
            <div
              className="rounded-full flex items-center justify-center cursor-pointer h-8 w-8 hover:bg-base-200"
              onClick={() => handlePageChange(Math.min(page + 1, maxPage))}>
              →
            </div>
          )}
        </div>
      )}

      {data && data.results && data.results.length > 0 ? (
        <div>
          <h2>Results: {searchQuery}</h2>
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
                : result.profile_path
                ? `${IMG_URL}${result.profile_path}`
                : "https://via.placeholder.com/600x400"; // Updated placeholder URL

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
      {/* Render pagination only if there are multiple pages */}
      {maxPage > 1 && (
        <div
          className="join my-5"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
          }}>
          {page > 1 && (
            <div
              className="rounded-full h-8 w-8 hover:bg-base-200 flex items-center justify-center cursor-pointer"
              onClick={() => handlePageChange(Math.max(page - 1, 1))}>
              ←
            </div>
          )}

          {/* Dynamically Render Page Buttons */}
          {[...Array(3)].map((_, index) => {
            const p = page === 1 ? index + 1 : page - 1 + index; // Adjust range based on current page
            return (
              <div
                key={p}
                className={`rounded-full h-10 w-10 text-sm flex items-center justify-center ${
                  p === page
                    ? "bg-purple-500 text-white"
                    : "transparent h-8 w-8 hover:bg-base-200"
                }`}
                onClick={() => handlePageChange(p)}
                style={{
                  cursor: p > 0 && p <= maxPage ? "pointer" : "default",
                  pointerEvents: p > 0 && p <= maxPage ? "auto" : "none",
                }}>
                {p}
              </div>
            );
          })}

          {page < maxPage && (
            <div
              className="rounded-full flex items-center justify-center cursor-pointer h-8 w-8 hover:bg-base-200"
              onClick={() => handlePageChange(Math.min(page + 1, maxPage))}>
              →
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchQuery;
