import { InputHTMLAttributes } from 'react';
import styled from 'styled-components';

const CheckBox = (props: InputHTMLAttributes<HTMLInputElement>) => {
  return <InputCheckBox {...props} />;
};

const InputCheckBox = styled.input.attrs({ type: 'checkbox' })`
  appearance: none;
  width: 28px;
  height: 28px;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  position: relative;
  outline: none;
  cursor: pointer;

  &:checked {
    background-color: ${({ theme }) => theme.colors.black};

    &::before {
      content: '';
      position: absolute;
      left: 8px;
      top: 0px;
      width: 6px;
      height: 16px;
      border: solid ${({ theme }) => theme.colors.white};
      border-width: 0 4px 4px 0;
      transform: rotate(45deg);
    }
  }
`;

export default CheckBox;
