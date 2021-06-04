import useOrder from './useOrder';
import { chunckedArray } from '../utils';
import { useState } from 'react';

const usePagination = () => {
  const { orderedItems } = useOrder();
  const [page, setPage] = useState(1);
  const [right, setRight] = useState(false);
  const [left, setLeft] = useState(false);
  const [translate, setTranslate] = useState(0);

  const pageLength = Math.ceil(orderedItems.length / 10);
  const pages = Object.keys([...Array(pageLength)]).map(
    page => Number(page) + 1
  );
  const itemsPerPage = chunckedArray(orderedItems, 10);

  const sortedItems = itemsPerPage.map(items =>
    items.sort((a, b) => b.order_id - a.order_id)
  );

  const onChangePage = ({ target }) => {
    const newPage = Number(target.innerText);
    setPage(newPage);
  };

  const goPreviousPage = () => {
    if (page === 1) return;
    setPage(page - 1);
    setLeft(true);
    setRight(false);

    if (3 < page && page <= pages.length - 2) {
      setTranslate(translate + 20);
    }
  };

  const goNextPage = () => {
    if (page === pageLength) return;
    setPage(page + 1);
    setRight(true);
    setLeft(false);

    if (3 <= page && page < pages.length - 2) {
      setTranslate(translate - 20);
    } else if (page >= pages.length - 3) {
      setTranslate(-40);
    }
  };

  return {
    page,
    pages,
    sortedItems,
    right,
    left,
    translate,
    onChangePage,
    goNextPage,
    goPreviousPage,
    setRight,
    setLeft,
  };
};

export default usePagination;
