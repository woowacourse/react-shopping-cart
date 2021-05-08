import React from 'react';
import styled from 'styled-components';
import OrderListItem from '../components/orderListItem/OrderListItem';
import PageTitle from '../components/pageTitle/PageTitle';
import PaymentAmount, { TYPE } from '../components/paymentAmount/PaymentAmount';
import { COLOR } from '../constants/color';

const Content = styled.section`
  position: relative;
  display: flex;
  margin-top: 25px;
  padding: 0 18px;
`;

const OrderPaymentCount = styled.div`
  padding-bottom: 24px;
  border-bottom: 4px solid ${COLOR.GRAY_400};
  font-size: 24px;
  font-weight: 500;
`;

const OrderPaymentItemWrapper = styled.li`
  border-bottom: 2px solid ${COLOR.GRAY_200};
  margin-top: 18px;
  padding-bottom: 18px;
`;

const OrderPaymentAmountWrapper = styled.div`
  position: absolute;
  top: 50px;
  right: 0;
`;

const OrderPayment = ({ productListState }) => (
  <>
    <PageTitle>주문/결제</PageTitle>
    <Content>
      <div>
        <OrderPaymentCount>주문 상품(4건) </OrderPaymentCount>
        <ul>
          {productListState.map(({ src, id, alt, name }) => (
            <OrderPaymentItemWrapper key={id}>
              <OrderListItem src={src} alt={alt} name={name} count={1} />
            </OrderPaymentItemWrapper>
          ))}
        </ul>
      </div>
      <OrderPaymentAmountWrapper>
        <PaymentAmount type={TYPE.ORDER_PAYMENT} price={325000} />
      </OrderPaymentAmountWrapper>
    </Content>
  </>
);

export default OrderPayment;
