import { ButtonHTMLAttributes, ReactNode } from 'react';

import { StyledButton } from '@commons/Button/Button.styled';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  width?: string;
  height?: string;
  padding?: string;
  border?: string;
  borderRadius?: string;
  backgroundColor?: string;
  fontSize?: string;
  color?: string;
  ariaLabel?: string;
  children?: ReactNode;
}

const Button = (props: ButtonProps) => {
  const {
    width = '',
    height = '',
    padding = '',
    border = '',
    borderRadius = '',
    backgroundColor = '',
    fontSize = '',
    color = '',
    type = 'submit',
    name = '',
    ariaLabel = '',
    children,
    onClick,
  } = props;

  return (
    <StyledButton
      width={width}
      height={height}
      padding={padding}
      border={border}
      borderRadius={borderRadius}
      backgroundColor={backgroundColor}
      fontSize={fontSize}
      color={color}
      type={type}
      name={name}
      aria-label={ariaLabel}
      onClick={onClick}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
