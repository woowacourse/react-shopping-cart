import React from 'react';
import { Container } from './Button.styles';

type ButtonType = 'default' | 'simple';

interface ButtonProps {
  children: React.ReactNode;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  $buttonStyle?: ButtonType;
  $opacity?: number;
}

const Button = ({
  children,
  onClick,
  $buttonStyle = 'default',
  disabled = false,
  $opacity = 1,
  ...props
}: ButtonProps) => (
  <Container
    disabled={disabled}
    onClick={onClick}
    $buttonStyle={$buttonStyle}
    $opacity={$opacity}
    {...props}
  >
    {children}
  </Container>
);

export default Button;
export type { ButtonProps, ButtonType };
