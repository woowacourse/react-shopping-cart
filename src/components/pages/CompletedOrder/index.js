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
  } = usePagination();

  const lastPage = pages.length + 1;

  useEffect(() => {
    getCompletedOrder();
    setRight(false);
    setLeft(false);
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
          <PageButtonWrapper
            right={right}
            left={left}
            translate={translate}
            page={page}
            lastPage={lastPage}
          >
            {pages.map((currentPage, id) => (
              <PageButton
                key={id}
                currentPage={currentPage}
                page={page}
                onClick={onChangePage}
              >
                {currentPage}
              </PageButton>
            ))}
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
