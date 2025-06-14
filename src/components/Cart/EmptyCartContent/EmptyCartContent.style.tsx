import styled from "@emotion/styled";

export const EmptyCartMessage = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 16px;
  font-weight: 500;
`;

export const OrderConfirmButton = styled.button`
  width: 100%;
  max-width: 430px;
  background-color: #000000;
  color: #ffffff;

  bottom: 0;

  height: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 24px;
  padding-right: 24px;
  position: fixed;
  z-index: 100;

  font-size: 16px;
  font-weight: 700;

  a {
    text-decoration: none;
  }
  transform: translateX(-50%);
  left: 50%;

  &:disabled {
    background-color: rgb(105, 105, 105);
    cursor: not-allowed;
  }
`;
