import { useState } from 'react';

const usePagination = (startIndex, endIndex, itemsPerPage) => {
  const [pageStartIndex, setPageStartIndex] = useState(0);

  const onPageNext = () => {
    if (pageStartIndex + itemsPerPage > endIndex) return;
    setPageStartIndex(pageStartIndex + itemsPerPage);
  };

  const onPagePrevious = () => {
    if (pageStartIndex - itemsPerPage < startIndex) return;
    setPageStartIndex(pageStartIndex - itemsPerPage);
  };

  const onPageSelected = (idx) => () => {
    setPageStartIndex(idx * itemsPerPage);
  };

  const isNextPageAvailable = pageStartIndex + itemsPerPage < endIndex;
  const isPreviousPageAvailable = pageStartIndex - itemsPerPage >= startIndex;
  const currentPage = Math.floor(pageStartIndex / itemsPerPage) + 1;

  return {
    pageStartIndex,
    onPagePrevious,
    onPageNext,
    onPageSelected,
    isNextPageAvailable,
    isPreviousPageAvailable,
    currentPage,
  };
};

export default usePagination;
