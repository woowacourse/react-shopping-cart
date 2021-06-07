import { chunckedArray } from '../utils';
import { useState } from 'react';

const usePagination = () => {
  const [page, setPage] = useState(1);

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
    setPage(newPage);
  };

  const goPreviousPage = () => {
    if (page === 1) return;
    setPage(page - 1);
  };

  const goNextPage = (data, pageCuttingStandard) => {
    if (page === getPageLength(data, pageCuttingStandard)) return;
    setPage(page + 1);
  };

  const index = page - 1;

  return {
    index,
    page,
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
