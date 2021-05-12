import React from 'react';
import styled from 'styled-components';
import { COLOR } from '../../constants/color';
import Button, { BUTTON_TYPE } from '../button/Button';
import PropTypes from 'prop-types';
import TextHighlight from '../textHighlight/TextHighlight';

export const PAYMENT_AMOUNT_TYPE = Object.freeze({
  SHOPPING_CART: 'SHOPPING_CART',
  ORDER_PAYMENT: 'ORDER_PAYMENT',
});

const paymentAmountText = {
  SHOPPING_CART: {
    title: '결제예상금액',
    content: '결제예상금액',
  },
  ORDER_PAYMENT: {
    title: '결제금액',
    content: '총 결제금액',
  },
};

const Container = styled.div`
  width: 448px;
  height: 318px;
  border: 1px solid ${COLOR.GRAY_200};
  padding: 22px 0 35px 0;
`;

const Title = styled.span`
  display: block;
  border-bottom: 3px solid ${COLOR.GRAY_200};
  padding: 0 0 19px 30px;
  font-size: 24px;
`;

const TextWrapper = styled.div`
  display: flex;
  font-weight: bold;
  justify-content: space-between;
  padding: 32px 30px 64px 30px;
  font-size: 20px;
`;

const getButtonText = ({ type, count, price }) => {
  const buttonTextType = {
    SHOPPING_CART: count ? `주문하기(${count}개)` : '주문하기',
    ORDER_PAYMENT: `${price.toLocaleString('ko-KR')}원 결제하기`,
  };

  return buttonTextType[type];
};

const PaymentAmount = ({ type, price, count, onClick }) => (
  <Container>
    <Title>{paymentAmountText[type].title}</Title>
    <div>
      <TextWrapper>
        <TextHighlight>{paymentAmountText[type].content}</TextHighlight>
        <TextHighlight>{price.toLocaleString('ko-KR')}원</TextHighlight>
      </TextWrapper>
      <Button styles={{ marginLeft: '30px' }} type={BUTTON_TYPE.MEDIUM} onClick={onClick} disabled={count === 0}>
        {getButtonText({ type, price, count })}
      </Button>
    </div>
  </Container>
);

PaymentAmount.propTypes = {
  type: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  count: PropTypes.number,
};

export default PaymentAmount;
