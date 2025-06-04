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

export const OrderResultWrapper = styled.div`
  width: 100%;
  padding: 36px 24px 0 24px;
  margin-bottom: 36px;
`;

export const CartItemWrapper = styled.div`
  width: 100%;
  height: calc(100vh - 400px);
  padding: 0 24px;
  margin-bottom: 100px;
  overflow-y: auto;
  position: relative;
`;

export const CouponButton = styled.button`
  width: 100%;
  height: 48px;
  background-color: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  font-size: 15px;
  font-weight: bold;
  color: #000000;
  cursor: pointer;
  margin: 0px 0px 32px 0px;
`;

export const DeliveryInfo = styled.div`
  width: 100%;
  height: 48px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 32px;
`;

export const DeliveryInfoTitle = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #000000;
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
