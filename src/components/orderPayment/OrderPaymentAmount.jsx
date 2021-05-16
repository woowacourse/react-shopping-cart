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

const OrderPaymentAmount = ({ price, onClick }) => (
  <Container>
    <Title>결제금액</Title>
    <div>
      <TextWrapper>
        <TextHighlight>총 결제금액</TextHighlight>
        <TextHighlight>{price.toLocaleString('ko-KR')}원</TextHighlight>
      </TextWrapper>
      <Button styles={{ marginLeft: '30px' }} type={BUTTON_TYPE.MEDIUM} onClick={onClick}>
        {price.toLocaleString('ko-KR')}원 결제하기
      </Button>
    </div>
  </Container>
);

OrderPaymentAmount.propTypes = {
  price: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default OrderPaymentAmount;
