import { animated } from '@react-spring/web';
import React from 'react';
import styled from 'styled-components';
import { COLOR } from '../../constants/color';
import Button, { BUTTON_TYPE } from '../button/Button';
import PropTypes from 'prop-types';
import TextHighlight from '../textHighlight/TextHighlight';
import useNumberAnimation from '../../hooks/useNumberAnimation';

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
  padding: 32px 30px 64px 30px;
  font-size: 20px;
`;

const AnimatedTextHighlight = animated(TextHighlight);

const OrderPaymentAmount = ({ price, onClick }) => {
  const number = useNumberAnimation(price);

  return (
    <Container>
      <Title>결제금액</Title>
      <div>
        <TextWrapper>
          <TextHighlight>총 결제금액</TextHighlight>
          <AnimatedTextHighlight styles={{ marginLeft: 'auto' }}>
            {number.to((n) => n.toLocaleString('ko-KR', { minimumFractionDigits: 0, maximumFractionDigits: 0 }))}
          </AnimatedTextHighlight>
          <TextHighlight>원</TextHighlight>
        </TextWrapper>
        <Button styles={{ marginLeft: '30px' }} type={BUTTON_TYPE.MEDIUM} onClick={onClick}>
          {`${price.toLocaleString('ko-KR')}원 결제하기`}
        </Button>
      </div>
    </Container>
  );
};

OrderPaymentAmount.propTypes = {
  price: PropTypes.number.isRequired,
};

export default OrderPaymentAmount;
