import React from 'react';
import styled from 'styled-components';
import { useHistory, useLocation } from 'react-router';
import { PATH } from '../constants/path';
import { requestInsertItem } from '../request/request';
import { API_PATH } from '../constants/api';
import { PageTitle, OrderPaymentAmount, Loading, OrderPaymentItemList } from '../components';
import useScrollPosition from '../hooks/useScrollPosition';
import useGettingData from '../hooks/useGettingData';

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
  const { mutate, isLoading } = useGettingData(API_PATH.ORDER_ITEM_LIST);

  const { state } = useLocation();
  const history = useHistory();

  useScrollPosition(!isLoading);

  const { orderPaymentItemList, totalPrice } = state;

  const handleOrderListPageRouter = async () => {
    await requestInsertItem(
      API_PATH.ORDER_ITEM_LIST,
      orderPaymentItemList.map(({ cartId, quantity }) => ({ cartId, quantity }))
    );

    mutate();

    history.replace(PATH.ORDER_LIST);
  };

  if (isLoading) {
    return <Loading />;
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
