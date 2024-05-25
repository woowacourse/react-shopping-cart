import { COLOR } from '@styles/style.constant';
import styled from 'styled-components';

export const ItemContainer = styled.li`
  border-top: 1px solid ${COLOR.borderColor};
  padding-top: 12px;
  margin-top: 12px;
`;

export const ItemDetailContainer = styled.div<{ $direction: React.CSSProperties['flexDirection'] }>`
  display: flex;
  flex-direction: ${({ $direction }) => $direction};
  gap: 24px;
  margin-top: 12px;
`;
