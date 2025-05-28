import styled from "@emotion/styled";

export const Root = styled.div`
  background-color: #a2a2a2;
  height: 100vh;
`;

export const CartPageWrapper = styled.div`
  width: 430px;
  height: 100%;
  background-color: #ffffff;
  margin: 0 auto;
`;

export const Content = styled.div`
  padding: 36px 24px;
  height: calc(100vh - 120px);
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

  &:hover {
    background-color: #333333;
  }
`;

export const Description = styled.p`
  font-size: 12px;
  color: #666666;
  margin: 13px 0px;
`;
