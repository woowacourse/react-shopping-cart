import { SIZE } from '@styles/style.constant';
import styled from 'styled-components';

export const CartItemSelectionGroup = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const CartListButtonGroup = styled.div`
  margin-top: 36px;
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const CartItemContainer = styled.section`
  margin-top: 20px;
  width: 100%;
  max-height: calc(100vh - ${SIZE.navigationHeight} - ${SIZE.bottomButtonHeight} - 200px - 290px);
  overflow-y: auto;
`;

export const CartListContainer = styled.li`
  padding-top: 12px;
`;

export const CartItemImage = styled.div`
  width: 112px;
  height: 112px;
  border-radius: 8px;
`;

export const CartItemDetailContainer = styled.div`
  display: flex;
  gap: 24px;
  margin-top: 12px;
`;
