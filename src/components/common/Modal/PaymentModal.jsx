import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { OrderButton } from 'components/common/Styled';
import { COLOR } from 'constants';

const Styled = {
  Wrapper: styled.section`
    display: flex;
    flex-direction: column;
    width: 448px;
    border: 1px solid ${COLOR.MODAL_BORDER};
    padding-bottom: 20px;

    :last-child > button {
      margin-left: 22px;
    }
  `,
  Title: styled.h2`
    position: relative;
    font-size: 24px;
    font-weight: 400;
    padding: 22px;
    border-bottom: 1px solid ${COLOR.MODAL_BORDER};
  `,
  ContentBox: styled.div`
    display: flex;
    justify-content: space-between;
    padding: 33px 22px;
    margin-bottom: 30px;
  `,
  Content: styled.div`
    position: relative;
    font-weight: 700;
    font-size: 20px;

    :after {
      content: '';
      position: absolute;
      left: 0px;
      bottom: -4px;
      width: 100%;
      height: 10px;
      background: ${COLOR.UNDER_LINE};
    }
  `,
};

const PaymentModal = ({ title, description, amount, count }) => {
  return (
    <Styled.Wrapper>
      <Styled.Title>{title}</Styled.Title>
      <Styled.ContentBox>
        <Styled.Content>{description}</Styled.Content>
        <Styled.Content>{amount}원</Styled.Content>
      </Styled.ContentBox>
      <OrderButton>주문하기</OrderButton>
    </Styled.Wrapper>
  );
};

PaymentModal.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  amount: PropTypes.number,
  count: PropTypes.number,
};

export default PaymentModal;
