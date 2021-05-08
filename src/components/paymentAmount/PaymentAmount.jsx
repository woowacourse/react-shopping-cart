import React from 'react';
import styled from 'styled-components';
import { COLOR } from '../../constants/color';
import Button, { TYPE as BUTTON_TYPE } from '../button/Button';

export const TYPE = Object.freeze({
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

const TextHighlight = styled.span`
  position: relative;

  &::after {
    position: absolute;
    display: inline-block;
    content: ' ';
    width: 100%;
    height: 8px;
    background: rgba(42, 193, 188, 0.5);
    left: 0px;
    bottom: 0px;
    z-index: -1;
  }
`;

// TODO: 스타일드 컴포넌트 변수명 생각해보기 Styled도 붙고, PaymetAmount가 있는데 또 붙어 있어서 지저분함
const PaymentAmount = ({ type, price, count }) => (
  <Container>
    <Title>{paymentAmountText[type].title}</Title>
    <div>
      <TextWrapper>
        <TextHighlight>{paymentAmountText[type].content}</TextHighlight>
        <TextHighlight>{price.toLocaleString('ko-KR')}원</TextHighlight>
      </TextWrapper>
      <Button styles={{ marginLeft: '30px' }} type={BUTTON_TYPE.MEDIUM}>
        {paymentAmountText[type] === 'SHOPPING_CART'
          ? `주문하기(${count})개`
          : `${price.toLocaleString('ko-KR')}원 결제하기`}
      </Button>
    </div>
  </Container>
);

export default PaymentAmount;
