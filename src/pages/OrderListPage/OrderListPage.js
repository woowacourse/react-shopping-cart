import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled, { css } from 'styled-components';

import PageTitle from '../../components/PageTitle';
import Flex from '../../components/utils/Flex';
import LoadingPage from '../LoadingPage';
import OrderListItem from './OrderListItem';

import { getOrderListRequest } from '../../modules/paymentSlice';
import { PAGE_TITLE, STATUS, LOADING_MESSAGE } from '../../constant';

const OrderList = styled.ul`
  width: 1312px;
`;

const FlexStyle = css`
  width: 1312px;
  margin-top: 55px;
`;

function OrderListPage() {
  const dispatch = useDispatch();
  const { status, orderedList, errorMessage } = useSelector((state) => state.paymentSlice);

  useEffect(() => {
    dispatch(getOrderListRequest());
  }, [dispatch]);

  useEffect(() => {
    if (errorMessage) {
      window.alert(errorMessage);
    }
  }, [errorMessage]);

  return (
    <>
      {status === STATUS.LOADING && <LoadingPage>{LOADING_MESSAGE.ORDER_LIST}</LoadingPage>}
      <PageTitle pageTitle={PAGE_TITLE.ORDER_LIST} />
      <Flex justifyContent="center" alignItems="center" flexDirection="column" css={FlexStyle}>
        <OrderList>
          {orderedList && orderedList.map((order) => <OrderListItem order={order} key={order.order_id} />).reverse()}
        </OrderList>
      </Flex>
    </>
  );
}

export default OrderListPage;
