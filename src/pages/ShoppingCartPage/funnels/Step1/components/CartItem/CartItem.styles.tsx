import styled from "@emotion/styled";

export const CartItemWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 8px 0;
  position: relative;
`;

export const CartItemImageWrapper = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 8px;
  overflow: hidden;
`;

export const CartItemImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const CartItemInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

export const CartItemName = styled.div`
  font-size: 16px;
  font-weight: 600;
`;

export const CartItemPrice = styled.div`
  font-size: 16px;
  font-weight: 600;
`;

export const CartItemQuantity = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const CartItemQuantityButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
`;

export const CartItemQuantityButtonIcon = styled.div`
  width: 16px;
  height: 16px;
`;

export const CartItemDeleteButton = styled.button`
  position: absolute;
  right: 0;
  top: 0;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ProductCardCartItemWrapper = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.gray};
  padding: 12px 0;
`;
