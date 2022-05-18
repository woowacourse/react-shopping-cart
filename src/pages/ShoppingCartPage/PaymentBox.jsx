import React from "react";
import styled from "styled-components";

import Button from "../../components/common/Button";
import HighlightedText from "../../components/common/HighlightedText";

function PaymentBox() {
  return (
    <Box>
      <BoxTitle>결제예상금액</BoxTitle>
      <Line />
      <TextContainer>
        <HighlightedText>결제예상금액</HighlightedText>
        <HighlightedText>21,700원</HighlightedText>
      </TextContainer>
      <OrderButton>주문하기(2개)</OrderButton>
    </Box>
  );
}

function OrderButton({ children }) {
  const onClick = () => {
    alert("🚧 준비 중 🚧 ");
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

const Box = styled.div`
  position: sticky;
  top: 300px;

  width: 448px;
  padding: 30px;

  border: 1px solid ${({ theme }) => theme.color.grey_100};
`;

const BoxTitle = styled.h3`
  height: 40px;
  margin-bottom: 20px;

  font-size: 24px;
  line-height: 33px;
  letter-spacing: 0.5px;
  color: ${({ theme }) => theme.color.grey_700};
`;

const Line = styled.hr`
  position: relative;
  left: -30px;

  width: 446px;
  height: 3px;

  background-color: ${({ theme }) => theme.color.grey_100};
  border: none;
`;

const TextContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 68px;
  padding-top: 34px;
`;

export default PaymentBox;
