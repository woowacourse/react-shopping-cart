import React from "react";

import Button from "../../components/common/Button";
import HighlightedText from "../../components/common/HighlightedText";
import {
  StyledPaymentBoxContainer,
  StyledTitle,
  StyledLine,
  StyledHighlightedTextContainer,
} from "./PaymentBox.styled";

function PaymentBox({ amount, quantity }) {
  return (
    <StyledPaymentBoxContainer>
      <StyledTitle>결제예상금액</StyledTitle>
      <StyledLine />
      <StyledHighlightedTextContainer>
        <HighlightedText>결제예상금액</HighlightedText>
        <HighlightedText>{amount.toLocaleString()}원</HighlightedText>
      </StyledHighlightedTextContainer>
      <OrderButton>주문하기({quantity}개)</OrderButton>
    </StyledPaymentBoxContainer>
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
