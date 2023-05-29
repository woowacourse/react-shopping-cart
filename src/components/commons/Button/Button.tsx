import { ButtonHTMLAttributes, ReactNode } from 'react';

import { StyledButton } from '@commons/Button/Button.styled';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  width?: string;
  height?: string;
  padding?: string;
  border?: string;
  borderRadius?: string;
  backgroundColor?: string;
  ariaLabel?: string;
  children?: ReactNode;
}

export const Button = (props: ButtonProps) => {
  return <StyledButton {...props}>{props.children}</StyledButton>;
};
