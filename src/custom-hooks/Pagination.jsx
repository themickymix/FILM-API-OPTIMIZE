import React, { useState } from "react";

function Pagination({ currentPage, totalPages, onPageChange }) {
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };

  return (
    <div className="join">
      {/* Previous Button */}
      <button
        className="join-item btn"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}>
        Prev
      </button>

      {/* Current Page */}
      <span className="join-item btn btn-active">{currentPage}</span>

      {/* Next Button */}
      <button
        className="join-item btn"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}>
        Next
      </button>
    </div>
  );
}
export default Pagination;