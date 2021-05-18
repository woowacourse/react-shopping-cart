import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { COLOR } from '../../constants/color';
import { TextHighlight } from '..';

const Container = styled.div`
  width: 448px;
  background-color: transparent;
  padding: 22px 0 35px 0;
  margin-left: auto;
  margin-bottom: 30px;
`;

const Title = styled.span`
  display: block;
  border-bottom: 3px solid ${COLOR.GRAY_200};
  padding-bottom: 19px;
  font-size: 24px;
  font-weight: bold;
`;

const TextWrapper = styled.div`
  display: flex;
  font-weight: bold;
  justify-content: space-between;
  padding-top: 70px;
  font-size: 20px;
`;

const OrderListPaymentAmount = ({ price }) => (
  <Container>
    <Title>결제금액 정보</Title>
    <div>
      <TextWrapper>
        <TextHighlight>총 결제금액</TextHighlight>
        <TextHighlight>{price.toLocaleString('ko-KR')}원</TextHighlight>
      </TextWrapper>
    </div>
  </Container>
);

OrderListPaymentAmount.propTypes = {
  price: PropTypes.number.isRequired,
};

export default OrderListPaymentAmount;
