import { COLOR } from '@styles/style.constant';
import styled from 'styled-components';

export const Checkbox = styled.label`
  display: inline-block;
  cursor: pointer;
  width: 24px;
  height: 24px;
`;
export const CheckboxInput = styled.input`
  display: none;
`;

export const CheckIcon = styled.img<{ $checked: boolean }>`
  width: 100%;
  height: 100%;
  border-radius: 8px;
  background-color: ${({ $checked }) => ($checked ? COLOR.black : COLOR.white)};
  border: 1px solid ${COLOR.borderColor};
`;
