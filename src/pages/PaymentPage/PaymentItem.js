import React from 'react';

import Image from '../../components/utils/Image';
import Flex from '../../components/utils/Flex';

import { COLOR } from '../../constant';

import styled, { css } from 'styled-components';

const SinglePaymentItem = styled.li`
  display: flex;
  box-sizing: border-box;
  align-items: center;
  width: 100%;
  height: 156px;
  padding: 18px 24px;
  border-bottom: 1px solid ${COLOR.GRAY[400]};
`;

const PaymentItemInfoWrapperStyle = css`
  align-self: flex-start;
  margin-left: 20px;
`;

const PaymentItemName = styled.span`
  font-size: 20px;
  margin: 4px 0 20px;
  color: ${COLOR.GRAY[800]};
`;

const PaymentItemQuantity = styled.span`
  font-size: 16px;
  color: ${COLOR.GRAY[800]};
`;

const PaymentItem = (paymentItem) => {
  return (
    <SinglePaymentItem>
      <Image
        width="120px"
        height="120px"
        src={paymentItem.image_url}
        alt={paymentItem.name}
        isBackgroundImageNeeded={true}
      />
      <Flex flexDirection="column" css={PaymentItemInfoWrapperStyle}>
        <PaymentItemName>{paymentItem.name}</PaymentItemName>
        <PaymentItemQuantity>수량 : {paymentItem.quantity}</PaymentItemQuantity>
      </Flex>
    </SinglePaymentItem>
  );
};

export default PaymentItem;
