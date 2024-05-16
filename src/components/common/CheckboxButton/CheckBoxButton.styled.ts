import { COLOR } from '@styles/style.constant';
import styled from 'styled-components';

export const CheckBoxButton = styled.button<{ $checked: boolean }>`
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  background-color: ${({ $checked }) => ($checked ? COLOR.black : COLOR.white)};
  border: 1px solid ${COLOR.borderColor};
`;
