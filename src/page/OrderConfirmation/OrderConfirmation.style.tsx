import styled from "@emotion/styled";

export const Container = styled.main`
  margin-top: 64px;
  width: 100%;
  min-height: 100vh;
  align-items: center;
  padding: 24px;
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
  z-index: 1000;

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

export const CouponButton = styled.button`
  width: 100%;
  height: 42px;
  border-radius: 4px;
  max-width: 430px;
  background-color: #ffffff;
  color: #222222;
  border: 1px solid #aaaaaa;
`;
export const Header = styled.header`
  width: 100%;
  margin-bottom: 20px;
`;
export const HeaderTitle = styled.h2`
  font-weight: 700;
  font-size: 24px;
`;
export const HeaderDescription = styled.p`
  font-weight: 500;
  font-size: 12px;
  span {
    display: block;
  }
`;
