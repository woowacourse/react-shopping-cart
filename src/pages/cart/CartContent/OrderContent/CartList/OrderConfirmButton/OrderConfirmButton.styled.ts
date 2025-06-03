import styled from "@emotion/styled";

export const OrderConfirmButton = styled.button`
  width: 500px;
  height: 64px;
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  background-color: #000000;
  color: #fff;
  font-size: 16px;
  font-weight: 700;

  &:disabled {
    background-color: #bebebe;
  }
`;
