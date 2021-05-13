import React from 'react';
import { useSelector } from 'react-redux';

import PaymentItem from './PaymentItem';
import PageTitle from '../../components/PageTitle';
import FloatingBox from '../../components/FloatingBox';

import { getTotalPrice } from '../../utils';

import styled from 'styled-components';

const PaymentItemWrapper = styled.div`
  display: flex;
  width: 1320px;
  justify-content: space-between;
`;

const PaymentItemSection = styled.section`
  width: 763px;
  margin: 42px 25px;
`;

const PaymentItemSectionTitle = styled.h3`
  font-size: 24px;
  font-weight: 700;
  line-height: 33px;
  margin: 8px;
`;

const PaymentList = styled.ul`
  margin-top: 32px;
  border-top: 4px solid #aaaaaa;
`;

const PaymentPage = () => {
  const paymentItems = useSelector((state) => state.payment);

  return (
    <>
      <PageTitle pageTitle="주문/결제" />

      <PaymentItemWrapper>
        <PaymentItemSection>
          <PaymentItemSectionTitle>주문 상품({paymentItems.length}건)</PaymentItemSectionTitle>
          <PaymentList>
            {paymentItems &&
              paymentItems.map((paymentItem) => <PaymentItem key={paymentItem.id} paymentItem={paymentItem} />)}
          </PaymentList>
        </PaymentItemSection>
        <FloatingBox price={getTotalPrice(paymentItems)} linkPath={'/orders'} />
      </PaymentItemWrapper>
    </>
  );
};

export default PaymentPage;
