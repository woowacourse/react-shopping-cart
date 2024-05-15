import { COLOR } from '@styles/style.constant';
import styled from 'styled-components';

export const CartListContainer = styled.li`
  border-top: 1px solid ${COLOR.borderColor};
  padding-top: 12px;
  margin-top: 12px;
`;

export const CartItemImage = styled.img`
  width: 112px;
  height: 112px;
  border-radius: 8px;
`;

export const CartItemDetailContainer = styled.div`
  display: flex;
  gap: 24px;
  margin-top: 12px;
`;

export const CartItemSelectionGroup = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
