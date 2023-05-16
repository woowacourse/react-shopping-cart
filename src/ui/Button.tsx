import React, { ButtonHTMLAttributes } from 'react';
import * as Styled from './styles/Button.styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  width?: string;
  height?: string;
  backgroundColor?: string;
  borderColor?: string;
}

export const Button = ({
  children,
  onClick,
  width,
  height,
  backgroundColor,
  borderColor,
}: ButtonProps) => {
  return (
    <Styled.Button
      onClick={onClick}
      $width={width}
      $height={height}
      backgroundColor={backgroundColor}
      borderColor={borderColor}
    >
      {children}
    </Styled.Button>
  );
};
