import styled from "@emotion/styled";

export const Root = styled.div`
  background-color: #a2a2a2;
  height: 100vh;
`;

export const CartPageWrapper = styled.div`
  width: 430px;

  height: 100vh;
  background-color: #ffffff;
  margin: 0 auto;
`;

export const Content = styled.div`
  height: 100%;
  overflow-y: scroll;
`;

export const Line = styled.hr`
  border: none;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  margin: 0;
`;

export const OrderButton = styled.button`
  width: 100%;
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

export const EmptyCart = styled.div`
  height: calc(100vh - 216px);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 500;
  text-align: center;
  padding: 36px 24px;
`;

export const HeaderTitle = styled.h2`
  font-weight: 800;
  font-size: 20px;
  margin: 0;
`;

export const CartContentWrapper = styled.div`
  padding: 36px 24px;
  overflow-y: scroll;
`;

export const HeaderIcon = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
`;
