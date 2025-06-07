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
  font-size: 12px;
  height: 100%;
  line-height: 1.5;
  padding: 10px 0px;
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

export const CouponButton = styled.button`
  width: 100%;
  height: 48px;
  border: 1px solid rgb(51, 51, 51, 0.25);
  background-color: #ffffff;
  font-size: 15px;
  font-weight: bold;
  border-radius: 5px;
  color: rgb(51, 51, 51, 0.75);
`;

export const OrderText = styled.h3`
  font-weight: 700;
  padding: 30px 0 0;
`;

export const Description = styled.p`
  font-size: 12px;
  color: #666666;
  margin: 13px 0px;
`;

export const CartListContainer = styled.ul`
  list-style: none;
  overflow-y: auto;
  height: calc(100vh - 687px);
  padding: 10px 0;
`;
