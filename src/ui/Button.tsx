import React, { ButtonHTMLAttributes } from 'react';
import * as Styled from './styles/Button.styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  width?: string;
  height?: string;
  backgroundColor?: string;
  borderColor?: string;
}

export const Button = ({
  children = 'Button',
  onClick,
  width = '132px',
  height = '32px',
  backgroundColor = 'transparent',
  borderColor = 'none',
}: ButtonProps) => {
  return (
    <Styled.Button
      onClick={onClick}
      width={width}
      height={height}
      backgroundcolor={backgroundColor}
      bordercolor={borderColor}
    >
      {children}
    </Styled.Button>
  );
};
