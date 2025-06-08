import styled from '@emotion/styled';

export const OrderItemWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 8px 0;
  position: relative;
`;

export const OrderItemImageWrapper = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 8px;
  overflow: hidden;
`;

export const OrderItemImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const OrderItemInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

export const OrderItemName = styled.div`
  font-size: 8px;
  font-weight: 600;
`;

export const OrderItemPrice = styled.div`
  font-size: 16px;
  font-weight: 600;
`;

export const OrderItemQuantity = styled.div`
  font-size: 8px;
  font-weight: 600;
`;
