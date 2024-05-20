import { COLOR } from '@styles/style.constant';
import styled from 'styled-components';

export const CheckboxWrapper = styled.label<{ $checked: boolean }>`
  width: 18px;
  height: 18px;
  padding: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  background-color: ${({ $checked }) => ($checked ? COLOR.black : COLOR.white)};
  border: 1px solid ${COLOR.borderColor};
`;

export const Checkbox = styled.input`
  display: none;
`;

export const CheckboxImage = styled.img`
  width: 100%;
  height: 100%;
`;
