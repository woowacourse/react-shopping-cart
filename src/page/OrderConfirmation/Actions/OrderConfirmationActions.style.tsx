import styled from "@emotion/styled";

export const OrderConfirmButton = styled.button`
  width: 100%;
  max-width: 430px;
  position: fixed;
  bottom: 0;
  background-color: #000000;
  color: #ffffff;

  height: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 24px;
  padding-right: 24px;

  font-size: 16px;
  font-weight: 700;

  a {
    text-decoration: none;
  }

  &:disabled {
    background-color: rgb(105, 105, 105);
    cursor: not-allowed;
  }
`;
