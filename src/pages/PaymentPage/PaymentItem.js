import React from 'react';

import Image from '../../components/utils/Image';

import styled from 'styled-components';

const SinglePaymentItem = styled.li`
  display: flex;
  box-sizing: border-box;
  align-items: center;
  width: 100%;
  height: 156px;
  padding: 18px 24px;
  border-bottom: 1px solid #cccccc;
`;

const PaymentItemInfoWrapper = styled.div`
  align-self: flex-start;
  display: flex;
  flex-direction: column;
  margin-left: 20px;
`;

const PaymentItemName = styled.span`
  font-size: 20px;
  margin: 4px 0 20px;
  color: #333333;
`;

const PaymentItemQuantity = styled.span`
  font-size: 16px;
  color: #333333;
`;

const PaymentItem = ({ paymentItem }) => {
  return (
    <SinglePaymentItem>
      <Image
        width="120px"
        height="120px"
        src={paymentItem.image}
        alt={paymentItem.name}
        isBackgroundImageNeeded={true}
      />
      <PaymentItemInfoWrapper>
        <PaymentItemName>{paymentItem.name}</PaymentItemName>
        <PaymentItemQuantity>수량 : {paymentItem.quantity}</PaymentItemQuantity>
      </PaymentItemInfoWrapper>
    </SinglePaymentItem>
  );
};

export default PaymentItem;
