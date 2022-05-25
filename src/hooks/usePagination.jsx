import { useState } from 'react';

export default function usePagination(totalProductCount, productCountPerPage) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPageLength = totalProductCount / productCountPerPage + 1;
  const startIndex = productCountPerPage * (currentPage - 1);
  const endIndex = startIndex + productCountPerPage - 1;

  const handlePageChange = order => {
    setCurrentPage(Number(order));
  };

  return { totalPageLength, currentPage, startIndex, endIndex, handlePageChange };
}
