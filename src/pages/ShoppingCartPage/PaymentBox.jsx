import React from "react";

import Button from "../../components/common/Button";
import HighlightedText from "../../components/common/HighlightedText";
import * as S from "./PaymentBox.styled";

function PaymentBox({ amount, quantity }) {
  return (
    <S.PaymentBoxContainer>
      <S.Title>결제예상금액</S.Title>
      <S.Line />
      <S.HighlightedTextContainer>
        <HighlightedText>결제예상금액</HighlightedText>
        <HighlightedText>{amount.toLocaleString()}원</HighlightedText>
      </S.HighlightedTextContainer>
      <OrderButton>주문하기({quantity}개)</OrderButton>
    </S.PaymentBoxContainer>
  );
}

function OrderButton({ children }) {
  const onClick = () => {
    alert("🚧 준비 중 🚧");
  };

  return (
    <Button
      onClick={onClick}
      width="100%"
      height="73px"
      bgColor="primary"
      fontSize="24px"
      color="white"
    >
      {children}
    </Button>
  );
}

export default PaymentBox;
