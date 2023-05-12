import React, { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';

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
    <StyledButton
      onClick={onClick}
      $width={width}
      $height={height}
      backgroundColor={backgroundColor}
      borderColor={borderColor}
    >
      {children}
    </StyledButton>
  );
};

const StyledButton = styled.button<{
  $width?: string;
  $height?: string;
  backgroundColor?: string;
  borderColor?: string;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ $width }) => $width || '132px'};
  height: ${({ $height }) => $height || '32px'};
  background-color: ${({ backgroundColor }) => backgroundColor || '#333333'};
  border: 1px solid ${({ borderColor }) => borderColor || 'none'};
`;
