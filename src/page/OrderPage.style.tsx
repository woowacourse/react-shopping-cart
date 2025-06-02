import styled from "@emotion/styled";

export const OrderConfirmButton = styled.button`
  width: 100%;
  max-width: 430px;
  background-color: #000000;
  color: #ffffff;
  height: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 24px;
  padding-right: 24px;
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  font-size: 16px;
  font-weight: 700;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
  bottom: 0;

  &:hover {
    background-color: #333333;
  }

  &:disabled {
    background-color: rgb(105, 105, 105);
    cursor: not-allowed;
  }
`;
