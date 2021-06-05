import { useEffect } from 'react';
import PropTypes from 'prop-types';
import CompletedOrderList from '../../CompletedOrderList';
import { Page } from '../../@common/PageWrapper/index.styles';
import PageHeader from '../../@common/PageHeader';
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
import useLoading from '../../../hooks/useLoading';
import Loading from '../../@common/Loading';

const CompletedOrder = () => {
  const { loading, timer } = useLoading();
  const { orderedItems, getCompletedOrder } = useOrder();
  const {
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
        {sortedItems[page - 1]?.length > 0 &&
          sortedItems[page - 1].map(order => (
            <li key={order.order_id}>
              <CompletedOrderList order={order} />
            </li>
          ))}
      </ul>
      <PaginationWrapper>
        <PageButtonDimmer>
          <PageButtonWrapper page={page}>
            <LeftButton onClick={goPreviousPage}> ＜ </LeftButton>
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
            <RightButton onClick={goNextPage}> ＞ </RightButton>
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
