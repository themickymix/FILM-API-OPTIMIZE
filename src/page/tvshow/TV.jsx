import React, { useEffect, useState } from "react";
import { GetApi } from "../../custom-hooks/GetApi";
import Card1 from "../../shared/card/Card1";

const TV = () => {
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const API_URL = `https://api.themoviedb.org/3/tv/popular?language=en-US&page=${page}`;
  const { data, loading, error } = GetApi(API_URL);

  // Update maxPage when data is available
  useEffect(() => {
    if (data?.total_pages) {
      setMaxPage(data.total_pages); // Set max pages from API response
    }
  }, [data]);

  const handlePageChange = (newPage) => {
    if (newPage === page) return;
    setPage(newPage);
  };
  if (!data) return data;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-4 md:p-8 lg:p-12 xl:p-16">
      {/* Pagination */}
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

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
        {data.results.map((tv) => {
          const date = tv.first_air_date.split("-")[0];

          return (
            <Card1
              key={tv.id}
              name={tv.name}
              img={tv.poster_path}
              id={tv.id}
              type={"tv"}
              date={date}
            />
          );
        })}
      </div>
      {/* Pagination */}
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
    </div>
  );
};

export default TV;
