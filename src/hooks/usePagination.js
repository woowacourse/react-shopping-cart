import { chunckedArray } from '../utils';
import { useState } from 'react';

const usePagination = () => {
  const [page, setPage] = useState(1);

  const pageLength = data => Math.ceil(data.length / 5);

  const totalPages = data =>
    Object.keys([...Array(pageLength(data))]).map(page => Number(page) + 1);

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

  const goNextPage = data => {
    if (page === pageLength(data)) return;
    setPage(page + 1);
  };

  const index = page - 1;

  return {
    index,
    page,
    totalPages,
    itemsPerPage,
    sortItemsBy,
    onChangePage,
    goNextPage,
    goPreviousPage,
  };
};

export default usePagination;
