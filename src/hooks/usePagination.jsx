import { useState } from 'react';
import PageController from 'component/common/PageController/PageController';

function usePagination(items, productsCountPerPage) {
  const [currentPage, setCurrentPage] = useState(1);

  const currentPageProducts = items.slice(
    (currentPage - 1) * productsCountPerPage,
    currentPage * productsCountPerPage
  );

  const pageLength = items.length / productsCountPerPage + 1;

  const handlePageChange = order => {
    setCurrentPage(Number(order));
  };

  const Pagination = () => (
    <PageController
      pageLength={pageLength}
      currentPage={currentPage}
      onPageChange={handlePageChange}
    />
  );

  return {
    currentPageProducts,
    Pagination,
  };
}

export default usePagination;
