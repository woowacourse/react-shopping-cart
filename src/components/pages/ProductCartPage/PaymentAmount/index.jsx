import React from "react";

import DefaultButton from "components/common/Button/DefaultButton";
import { PaymentAmountContainer, PaymentAmountPrice } from "./styled";

function PaymentAmount({ totalPrice, totalCount, position }) {
  return (
    <PaymentAmountContainer position={position}>
      <p>결제 예상 금액</p>
      <PaymentAmountPrice>
        <dt>결제 예상 금액</dt>
        <dd>{totalPrice?.toLocaleString() || "%ERROR%"}원</dd>
      </PaymentAmountPrice>
      <DefaultButton
        onClick={() => {
          alert("아직 준비중입니다~~");
        }}
      >
        주문하기({totalCount ?? "%ERROR%"}개)
      </DefaultButton>
    </PaymentAmountContainer>
  );
}

export default PaymentAmount;
