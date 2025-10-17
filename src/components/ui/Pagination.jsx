// src/components/ui/Pagination.jsx
import React from "react";
import "../../styles/Pagination.css"; // <-- correct relative path

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <div className="pagination">
      {pages.map((page) => (
        <div
          key={page}
          className={`page-number ${page === currentPage ? "active" : ""}`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </div>
      ))}
    </div>
  );
};

export default Pagination;