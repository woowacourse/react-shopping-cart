import React from 'react';
import { useHistory, useLocation } from 'react-router';
import styled from 'styled-components';
import PageTitle from '../components/pageTitle/PageTitle';
import OrderPaymentItemList from '../components/orderPayment/OrderPaymentItemList';
import { PATH } from '../constants/path';
import OrderPaymentAmount from '../components/orderPayment/OrderPaymentAmount';
import useOrderPayment from '../hooks/useOrderPayment';

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
  const history = useHistory();
  const { state } = useLocation();
  const { insertOrderItemList } = useOrderPayment();
  const { orderPaymentItemList, orderPaymentTotalPrice } = state;

  const handleOrderListPageRouter = async () => {
    await insertOrderItemList(orderPaymentItemList);

    history.push(PATH.ORDER_LIST);
  };

  return (
    <>
      <PageTitle>주문/결제</PageTitle>
      <Content>
        <div>
          <OrderPaymentItemList orderPaymentItemList={orderPaymentItemList} />
        </div>
        <div>
          <OrderPaymentAmountWrapper>
            <OrderPaymentAmount price={orderPaymentTotalPrice} onClick={handleOrderListPageRouter} />
          </OrderPaymentAmountWrapper>
        </div>
      </Content>
    </>
  );
};

export default OrderPayment;
