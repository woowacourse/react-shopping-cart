import { useState } from 'react';
import { PRODUCTS_PER_PAGE } from '../constants/appInfo';

const usePagination = (startIndex, endIndex) => {
  const [pageStartIndex, setPageStartIndex] = useState(0);

  const onPageNext = () => {
    if (pageStartIndex + PRODUCTS_PER_PAGE > endIndex) return;
    setPageStartIndex(pageStartIndex + PRODUCTS_PER_PAGE);
  };

  const onPagePrevious = () => {
    if (pageStartIndex - PRODUCTS_PER_PAGE < startIndex) return;
    setPageStartIndex(pageStartIndex - PRODUCTS_PER_PAGE);
  };

  const onPageSelected = (idx) => () => {
    setPageStartIndex(idx * PRODUCTS_PER_PAGE);
  };

  const isNextPageAvailable = pageStartIndex + PRODUCTS_PER_PAGE < endIndex;
  const isPreviousPageAvailable = pageStartIndex - PRODUCTS_PER_PAGE >= startIndex;
  const currentPage = Math.floor(pageStartIndex / PRODUCTS_PER_PAGE) + 1;

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
