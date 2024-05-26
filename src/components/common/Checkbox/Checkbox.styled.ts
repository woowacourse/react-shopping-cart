import { COLOR } from '@styles/style.constant';
import styled from 'styled-components';

export const Checkbox = styled.label<{ $checked: boolean }>`
  display: inline-block;
  cursor: pointer;
  width: 24px;
  height: 24px;
  border-radius: 8px;
  background-color: ${({ $checked }) => ($checked ? COLOR.black : COLOR.white)};
  border: 1px solid ${COLOR.borderColor};
`;
export const CheckboxInput = styled.input`
  display: none;
`;

export const CheckIconWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CheckIcon = styled.img`
  width: 18px;
  height: 13px;
  margin: auto;
`;
