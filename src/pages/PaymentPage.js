import React from 'react';

import PageTitle from '../components/PageTitle';
import FloatingBox from '../components/FloatingBox';
import Image from '../components/utils/Image';

import { paymentItems } from '../data/mock';

import styled from 'styled-components';

const StyledPaymentItemWrapper = styled.div`
  display: flex;
  width: 1320px;
  justify-content: space-between;
`;

const StyledPaymentItemSection = styled.section`
  width: 763px;
  margin: 42px 25px;
`;

const StyledPaymentItemSectionTitle = styled.h3`
  font-size: 24px;
  font-weight: 700;
  line-height: 33px;
  margin: 8px;
`;

const StylePaymentList = styled.ul`
  margin-top: 32px;
  border-top: 4px solid #aaaaaa;
`;

const StyledPaymentItem = styled.li`
  display: flex;
  box-sizing: border-box;
  align-items: center;
  width: 100%;
  height: 156px;
  padding: 18px 24px;
  border-bottom: 1px solid #cccccc;
`;

const StyledPaymentItemInfoWrapper = styled.div`
  align-self: flex-start;
  display: flex;
  flex-direction: column;
  margin-left: 20px;
`;

const StyledPaymentItemName = styled.span`
  font-size: 20px;
  margin: 4px 0 20px;
  color: #333333;
`;

const StyledPaymentItemQuantity = styled.span`
  font-size: 16px;
  color: #333333;
`;

function PaymentPage() {
  //TODO : 예외처리 (paymentsItems가 없을 때 처리를 어떻게 해줄 것인지?)
  const getPaymentItem = (paymentsItems) =>
    paymentsItems.map((paymentItem) => (
      <StyledPaymentItem key={paymentItem.id}>
        {/* <StyledPaymentItemImage src={paymentItem.image} alt={paymentItem.name} /> */}
        <Image
          width="120px"
          height="120px"
          src={paymentItem.image}
          alt={paymentItem.name}
          isBackgroundImageNeeded={true}
        />
        <StyledPaymentItemInfoWrapper>
          <StyledPaymentItemName>{paymentItem.name}</StyledPaymentItemName>
          <StyledPaymentItemQuantity>수량 : {paymentItem.quantity}</StyledPaymentItemQuantity>
        </StyledPaymentItemInfoWrapper>
      </StyledPaymentItem>
    ));

  return (
    <>
      <PageTitle pageTitle="주문/결제" />

      <StyledPaymentItemWrapper>
        <StyledPaymentItemSection>
          <StyledPaymentItemSectionTitle>주문 상품(4건)</StyledPaymentItemSectionTitle>
          <StylePaymentList>{getPaymentItem(paymentItems)}</StylePaymentList>
        </StyledPaymentItemSection>
        <FloatingBox />
      </StyledPaymentItemWrapper>
    </>
  );
}

export default PaymentPage;
