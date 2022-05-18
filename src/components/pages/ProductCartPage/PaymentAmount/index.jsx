import React from "react";
import styled from "styled-components";

import DefaultButton from "../../../common/DefaultButton";

const PaymentAmountContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 8px;

  width: 400px;
  height: 250px;
  padding: 16px;

  border: 1px solid ${({ theme: { color } }) => color.border};

  p {
    padding: 0 0 16px;

    color: ${({ theme: { color } }) => color.text};
    font-size: ${({ theme: { fontSize } }) => fontSize.large};
    border-bottom: 1px solid ${({ theme: { color } }) => color.border};
  }
`;

const PaymentAmountPrice = styled.dl`
  display: flex;
  justify-content: space-between;

  color: ${({ theme: { color } }) => color.text};
  font-size: ${({ theme: { fontSize } }) => fontSize.default};

  dt,
  dd {
    font-weight: 700;
    background: linear-gradient(
      to top,
      ${({ theme: { color } }) => color.point} 40%,
      transparent 30%
    );
  }
`;

function PaymentAmount({ totalPrice, totalCount }) {
  return (
    <PaymentAmountContainer>
      <p>결제 예상 금액</p>
      <PaymentAmountPrice>
        <dt>결제 예상 금액</dt>
        <dd>{totalPrice?.toLocaleString() || "%ERROR%"}원</dd>
      </PaymentAmountPrice>
      <DefaultButton>주문하기({totalCount ?? "%ERROR%"}개)</DefaultButton>
    </PaymentAmountContainer>
  );
}

export default PaymentAmount;
