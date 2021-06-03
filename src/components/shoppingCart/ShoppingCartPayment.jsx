import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { COLOR } from '../../constants/color';
import { Button, TextHighlight, BUTTON_TYPE } from '..';

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

const ShoppingCartPayment = ({ price, quantity, onClick }) => (
  <Container>
    <Title>결제예상금액</Title>
    <div>
      <TextWrapper>
        <TextHighlight>결제예상금액</TextHighlight>
        <TextHighlight>{price.toLocaleString('ko-KR')}원</TextHighlight>
      </TextWrapper>
      <Button styles={{ marginLeft: '30px' }} type={BUTTON_TYPE.MEDIUM} onClick={onClick} disabled={quantity === 0}>
        {quantity ? `주문하기(${quantity}개)` : '주문하기'}
      </Button>
    </div>
  </Container>
);

ShoppingCartPayment.propTypes = {
  price: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ShoppingCartPayment;
