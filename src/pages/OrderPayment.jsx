import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import PageTitle from '../components/pageTitle/PageTitle';
import OrderPaymentItemList from '../components/orderPayment/OrderPaymentItemList';
import { PATH } from '../constants/path';
import { insertOrderItemList } from '../redux/orderList';
import useOrderPayment from '../hooks/useOrderPayment';
import OrderPaymentAmount from '../components/orderPayment/OrderPaymentAmount';

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
  const dispatch = useDispatch();
  const { orderPaymentItemList, orderPaymentTotalPrice } = useOrderPayment();

  const handleOrderListPageRouter = async () => {
    await dispatch(insertOrderItemList(orderPaymentItemList));

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
