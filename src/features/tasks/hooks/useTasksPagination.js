import { useState } from "react";

export function useTasksPagination(totalPages) {
  const [page, setPage] = useState(1);

  function checkIfNextPageExist() {
    return totalPages && page < totalPages;
  }

  function checkIfPrevPageExist() {
    return totalPages && page > 1;
  }

  function fetchPrevPage() {
    if (!checkIfPrevPageExist()) {
      throw new Error("No previous page.");
    }
    setPage((currentPage) => currentPage - 1);
  }

  function fetchNextPage() {
    if (!checkIfNextPageExist()) {
      throw new Error("No Next page.");
    }
    setPage((currentPage) => currentPage + 1);
  }

  return {
    page,
    setPage,
    checkIfNextPageExist,
    checkIfPrevPageExist,
    fetchNextPage,
    fetchPrevPage,
  };
}
