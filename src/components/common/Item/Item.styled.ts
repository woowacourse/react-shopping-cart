import { COLOR } from '@styles/style.constant';
import styled from 'styled-components';

export const ItemContainer = styled.li`
  border-top: 1px solid ${COLOR.borderColor};
  padding-top: 12px;
  margin-top: 12px;
`;

export const ItemDetailContainer = styled.div`
  display: flex;
  gap: 24px;
  margin-top: 12px;
`;

export const ItemSelectionGroup = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
