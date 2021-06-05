import { useEffect } from 'react';
import PropTypes from 'prop-types';
import CompletedOrderList from '../../CompletedOrderList';
import { Page } from '../../@common/PageWrapper/index.styles';
import PageHeader from '../../@common/PageHeader';
import Loading from '../../@common/Loading';
import useOrder from '../../../hooks/useOrder';
import usePagination from '../../../hooks/usePagination';
import useLoading from '../../../hooks/useLoading';
import {
  PageButton,
  PageButtonWrapper,
  PageButtonDimmer,
  PaginationWrapper,
  ArrowButton,
} from './index.styles';

const CompletedOrder = () => {
  const { loading, timer } = useLoading();
  const { orderedItems, getCompletedOrder } = useOrder();
  const {
    index,
    page,
    sortItemsBy,
    totalPages,
    onChangePage,
    goNextPage,
    goPreviousPage,
  } = usePagination();

  const pages = totalPages(orderedItems);
  const lastPage = pages.length + 1;
  const sortedItems = sortItemsBy(orderedItems, 'order_id');

  useEffect(() => {
    getCompletedOrder();
  }, []);

  useEffect(() => {
    if (loading === false) return;
    timer();

    return clearTimeout(timer());
  }, [loading]);

  return (
    <Page bg="grey">
      {loading && <Loading />}
      <PageHeader>주문목록</PageHeader>
      <ul>
        {sortedItems[index]?.length > 0 &&
          sortedItems[index].map(order => (
            <li key={order.order_id}>
              <CompletedOrderList order={order} />
            </li>
          ))}
      </ul>
      <PaginationWrapper>
        <PageButtonDimmer>
          <PageButtonWrapper page={page}>
            <ArrowButton onClick={goPreviousPage}> ＜ </ArrowButton>
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
            <ArrowButton onClick={goNextPage}> ＞ </ArrowButton>
          </PageButtonWrapper>
        </PageButtonDimmer>
      </PaginationWrapper>
    </Page>
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
