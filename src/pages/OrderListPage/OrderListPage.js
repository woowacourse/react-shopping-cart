import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled, { css } from 'styled-components';

import PageTitle from '../../components/PageTitle';
import Flex from '../../components/utils/Flex';
import LoadingPage from '../LoadingPage';
import OrderListItem from './OrderListItem';

import { getOrderListRequest } from '../../modules/paymentSlice';

const OrderList = styled.ul`
  width: 1312px;
`;

const FlexStyle = css`
  width: 1312px;
  margin-top: 55px;
`;

function OrderListPage() {
  const dispatch = useDispatch();
  const { orderedList, errorMessage, loading } = useSelector((state) => state.paymentSlice);

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
      {loading && <LoadingPage>주문 목록을 불러오는 중입니다</LoadingPage>}
      <PageTitle pageTitle="주문목록" />
      <Flex justifyContent="center" alignItems="center" flexDirection="column" css={FlexStyle}>
        <OrderList>
          {orderedList && orderedList.map((order) => <OrderListItem order={order} key={order.order_id} />).reverse()}
        </OrderList>
      </Flex>
    </>
  );
}

export default OrderListPage;
