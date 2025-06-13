import styled from '@emotion/styled';

export const CartItemInfoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  border-top: 1px solid rgba(0, 0, 0, 0.2);
  padding: 12px 0;
`;

export const CartItemContent = styled.div`
  width: 100%;
  display: flex;
  gap: 25px;
  padding: 12px 0;
`;

export const CartItemImage = styled.img`
  width: 112px;
  height: 112px;
  object-fit: cover;
  border-radius: 8px;
`;

export const CartItemInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const CartItemInfoDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const CartItemInfoName = styled.span`
  font-size: 12px;
  font-weight: 500;
`;

export const CartItemInfoPrice = styled.span`
  font-size: 24px;
  font-weight: 700;
`;
