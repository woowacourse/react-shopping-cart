import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import { PATH } from '../constants/path';
import useFetch from '../hooks/useFetch';
import { requestInsertItem } from '../request/request';
import { API_PATH } from '../constants/api';
import { DELETE_SHOPPING_CART_ITEM_SUCCESS } from '../redux/actions/shoppingCartActions';
import { PageTitle, OrderPaymentAmount, Loading, OrderPaymentItemList } from '../components';

const Content = styled.section`
  position: relative;
  display: flex;
  margin-top: 25px;
  padding: 0 18px;
  gap: 100px;
`;

const OrderPaymentAmountWrapper = styled.div`
  position: sticky;
  margin-top: 50px;
  top: 50px;
`;

const OrderPayment = () => {
  const { startFetching, isLoading, error } = useFetch({
    fetchFunc: (item) => requestInsertItem(API_PATH.ORDER_ITEM_LIST, item),
  });
  const { state } = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  const { orderPaymentItemList, totalPrice } = state;

  const handleOrderListPageRouter = async () => {
    await startFetching(orderPaymentItemList.map(({ cart_id, quantity }) => ({ cart_id, quantity })));

    orderPaymentItemList.forEach((item) => {
      dispatch({ type: DELETE_SHOPPING_CART_ITEM_SUCCESS, payload: item.cart_id });
    });

    history.replace(PATH.ORDER_LIST);
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    throw new Error(error);
  }

  return (
    <>
      <PageTitle>주문/결제</PageTitle>
      <Content>
        <div>
          <OrderPaymentItemList orderPaymentItemList={orderPaymentItemList} />
        </div>
        <div>
          <OrderPaymentAmountWrapper>
            <OrderPaymentAmount price={totalPrice} onClick={handleOrderListPageRouter} />
          </OrderPaymentAmountWrapper>
        </div>
      </Content>
    </>
  );
};

export default OrderPayment;
