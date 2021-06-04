import { useEffect } from 'react';
import PropTypes from 'prop-types';
import CompletedOrderList from '../../CompletedOrderList';
import PageHeader from '../../@common/PageHeader';
import PageWrapper from '../../@common/PageWrapper';
import useOrder from '../../../hooks/useOrder';
import usePagination from '../../../hooks/usePagination';
import {
  PageButton,
  PageButtonWrapper,
  PageButtonDimmer,
  PaginationWrapper,
  LeftButton,
  RightButton,
} from './index.styles';

const CompletedOrder = () => {
  const { orderedItems, getCompletedOrder } = useOrder();
  const {
    page,
    sortItemsByDate,
    totalPages,
    onChangePage,
    goNextPage,
    goPreviousPage,
  } = usePagination();

  const pages = totalPages(orderedItems);
  const lastPage = pages.length + 1;
  const sortedItems = sortItemsByDate(orderedItems);

  useEffect(() => {
    getCompletedOrder();
  }, []);

  return (
    <PageWrapper bg="grey">
      <PageHeader>주문목록</PageHeader>
      <ul>
        {sortedItems[page - 1]?.length > 0 &&
          sortedItems[page - 1].map(order => (
            <li key={order.order_id}>
              <CompletedOrderList order={order} />
            </li>
          ))}
      </ul>
      <PaginationWrapper>
        <LeftButton onClick={goPreviousPage}> ＜ </LeftButton>
        <PageButtonDimmer>
          <PageButtonWrapper page={page}>
            {pages.map((currentPage, id) => {
              if (page <= 2 && currentPage <= 5) {
                return (
                  <PageButton
                    key={id}
                    currentPage={currentPage}
                    page={page}
                    onClick={onChangePage}
                  >
                    {currentPage}
                  </PageButton>
                );
              } else if (page >= currentPage - 2 && page <= currentPage + 2) {
                return (
                  <PageButton
                    key={id}
                    currentPage={currentPage}
                    page={page}
                    onClick={onChangePage}
                  >
                    {currentPage}
                  </PageButton>
                );
              } else if (page >= lastPage - 2 && currentPage >= lastPage - 5) {
                return (
                  <PageButton
                    key={id}
                    currentPage={currentPage}
                    page={page}
                    onClick={onChangePage}
                  >
                    {currentPage}
                  </PageButton>
                );
              } else {
                return <></>;
              }
            })}
          </PageButtonWrapper>
        </PageButtonDimmer>
        <RightButton onClick={goNextPage}> ＞ </RightButton>
      </PaginationWrapper>
    </PageWrapper>
  );
};

CompletedOrder.propTypes = {
  orderedItems: PropTypes.arrayOf(
    PropTypes.shape({
      order_id: PropTypes.string,
      order_details: PropTypes.arrayOf(
        PropTypes.shape({
          product_id: PropTypes.string,
          image_url: PropTypes.string,
          name: PropTypes.string,
          price: PropTypes.number,
          quantity: PropTypes.number,
        })
      ),
    })
  ),
};

export default CompletedOrder;
