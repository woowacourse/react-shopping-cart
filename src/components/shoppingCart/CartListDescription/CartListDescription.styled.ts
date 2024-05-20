import styled from 'styled-components';

export const CartItemDescriptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 4px;
`;

export const CartItemDescriptionTitle = styled.span`
  color: rgba(10, 13, 19, 1);
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
`;

export const CartItemDescriptionPrice = styled.span`
  color: rgba(0, 0, 0, 1);
  font-weight: 700;
  font-size: 24px;
  line-height: 34px;
`;

export const CartItemButtonGroup = styled.div`
  margin-top: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
`;
