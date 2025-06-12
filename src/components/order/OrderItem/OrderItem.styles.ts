import styled from "@emotion/styled";

export const OrderItem = styled.div`
  width: 100%;
  padding-top: 12px;
  border-top: 1px solid #0000001a;
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 24px;
`;

export const OrderItemImage = styled.div<{ $url: string }>`
  width: 112px;
  height: 112px;
  background: no-repeat url(${({ $url }) => $url});
  background-size: cover;
  border-radius: 8px;
`;

export const OrderItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 13px;
  justify-content: center;
`;

export const OrderItemName = styled.p`
  font-weight: 500;
  font-size: 16px;
`;

export const OrderItemPrice = styled.p`
  font-weight: 700;
  font-size: 26px;
`;

export const OrderItemQuantity = styled.p`
  font-weight: 500;
  font-size: 16px;
`;
