import styled from "@emotion/styled";

export const Root = styled.div`
  background-color: #a2a2a2;
  height: 100vh;
`;

export const OrderCompletePageWrapper = styled.div`
  width: 430px;
  height: 100vh;
  background-color: #ffffff;
  margin: 0 auto;
  position: relative;
`;

export const ButtonContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  gap: 0;
`;

export const PaymentButton = styled.button`
  flex: 1;
  height: 60px;
  background-color: #000000;
  color: #ffffff;
  font-size: 16px;
  font-weight: bold;
  border: none;
  cursor: pointer;

  &:disabled {
    background-color: #bebebe;
    cursor: not-allowed;
  }
`;
