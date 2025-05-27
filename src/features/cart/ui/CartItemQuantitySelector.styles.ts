import styled from '@emotion/styled';

export const CartItemQuantityContainer = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  border-radius: 8px;
  color: #000;
  gap: 12px;
`;

export const CartItemQuantitySelectorButton = styled.button`
  width: 24px;
  height: 24px;
  background-color: #fff;
  border-radius: 8px;
  border: 1px solid #ccc;
  cursor: pointer;
  transition: background-color 0.2s;
  :hover {
    background-color: #f0f0f0;
  }
  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

export const CartItemQuantityNumber = styled.div`
  font-size: 12px;
  font-weight: 500;
`;
