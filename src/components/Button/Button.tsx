import styled from '@emotion/styled';
import { ComponentProps } from 'react';

type ButtonProps = ComponentProps<'button'>;

function Button({ children, ...props }: ButtonProps) {
  return <BaseButton {...props}>{children}</BaseButton>;
}

export default Button;

export const BaseButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  color: white;
  height: 64px;
  background: #000000;
  border: none;
  font-weight: 700;
  font-size: 15px;
  line-height: 100%;
  text-align: center;
  cursor: pointer;

  :disabled {
    background-color: #bebebe;
    cursor: not-allowed;
  }
`;
