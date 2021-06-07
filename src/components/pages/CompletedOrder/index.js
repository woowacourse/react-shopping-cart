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
  SortedItems,
} from './index.styles';

const CompletedOrder = () => {
  const { loading } = useLoading();
  const { orderedItems, getCompletedOrder } = useOrder();
  const {
    index,
    firstPage,
    setFirstPage,
    sortItemsBy,
    getTotalPages,
    onChangePage,
    goNextPage,
    goPreviousPage,
  } = usePagination();

  const customFirstPage = 1;
  const pageCutStandard = 5;

  const setCustomFirstPage = () => setFirstPage(customFirstPage);
  const pages = getTotalPages(orderedItems, pageCutStandard);
  const lastPage = pages.length;
  const sortedItems = sortItemsBy(orderedItems, 'order_id');
  const isFirstPage = firstPage === customFirstPage;
  const isLastPage = firstPage === lastPage;

  useEffect(() => {
    setCustomFirstPage();

    getCompletedOrder();
  }, []);

  return (
    <Page bg="grey">
      {loading && <Loading />}
      <PageHeader>주문목록</PageHeader>
      <SortedItems>
        {sortedItems[index]?.length > 0 &&
          sortedItems[index].map(order => (
            <li key={order.order_id}>
              <CompletedOrderList order={order} />
            </li>
          ))}
      </SortedItems>
      <PaginationWrapper>
        <PageButtonDimmer>
          <PageButtonWrapper page={firstPage}>
            <ArrowButton disabled={isFirstPage} onClick={goPreviousPage}>
              ＜
            </ArrowButton>
            {pages.map((currentPage, id) => {
              if (firstPage <= 2 && currentPage <= 5) {
                return (
                  <PageButton
                    key={id}
                    currentPage={currentPage}
                    page={firstPage}
                    onClick={onChangePage}
                  >
                    {currentPage}
                  </PageButton>
                );
              } else if (
                firstPage >= currentPage - 2 &&
                firstPage <= currentPage + 2
              ) {
                return (
                  <PageButton
                    key={id}
                    currentPage={currentPage}
                    page={firstPage}
                    onClick={onChangePage}
                  >
                    {currentPage}
                  </PageButton>
                );
              } else if (
                firstPage >= lastPage - 2 &&
                currentPage >= lastPage - 5
              ) {
                return (
                  <PageButton
                    key={id}
                    currentPage={currentPage}
                    page={firstPage}
                    onClick={onChangePage}
                  >
                    {currentPage}
                  </PageButton>
                );
              } else {
                return <></>;
              }
            })}
            <ArrowButton
              disabled={isLastPage}
              onClick={() => goNextPage(orderedItems, pageCutStandard)}
            >
              ＞
            </ArrowButton>
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
