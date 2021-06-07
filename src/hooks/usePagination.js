import { chunckedArray } from '../utils';
import { useState } from 'react';

const usePagination = () => {
  const [firstPage, setFirstPage] = useState(1);

  const getPageLength = (data, pageCuttingStandard) =>
    Math.ceil(data.length / pageCuttingStandard);

  const getTotalPages = (data, pageCuttingStandard) =>
    Object.keys([...Array(getPageLength(data, pageCuttingStandard))]).map(
      page => Number(page) + 1
    );

  const itemsPerPage = data => chunckedArray(data, 5);

  const sortItemsBy = (data, standard) =>
    itemsPerPage(data).map(items =>
      items.sort((a, b) => b[standard] - a[standard])
    );

  const onChangePage = ({ target }) => {
    const newPage = Number(target.innerText);
    setFirstPage(newPage);
  };

  const goPreviousPage = () => {
    if (firstPage === 1) return;
    setFirstPage(firstPage - 1);
  };

  const goNextPage = (data, pageCuttingStandard) => {
    if (firstPage === getPageLength(data, pageCuttingStandard)) return;
    setFirstPage(firstPage + 1);
  };

  const index = firstPage - 1;

  return {
    index,
    firstPage,
    setFirstPage,
    getPageLength,
    getTotalPages,
    itemsPerPage,
    sortItemsBy,
    onChangePage,
    goNextPage,
    goPreviousPage,
  };
};

export default usePagination;
