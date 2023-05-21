import type { ButtonHTMLAttributes, ReactNode } from 'react';
import styled from 'styled-components';

type ButtonSizeType = 'small' | 'medium';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSizeType;
  autoSize?: boolean;
  primary?: boolean;
  border?: boolean;
  children: ReactNode;
}

const Button = ({
  size = 'medium',
  primary = true,
  autoSize = false,
  border = false,
  children,
  ...args
}: ButtonProps) => {
  return (
    <StyledButton
      size={size}
      primary={primary}
      autoSize={autoSize}
      border={border}
      {...args}
    >
      {children}
    </StyledButton>
  );
};

const buttonStyles = {
  small: {
    width: '100px',
    height: '35px',
    fontSize: '16px',
  },
  medium: {
    width: '300px',
    height: '73px',
    fontSize: '20px',
  },
};

const StyledButton = styled.button<{
  size: ButtonSizeType;
  primary: boolean;
  autoSize: boolean;
  border: boolean;
}>`
  ${({ size }) => buttonStyles[size]}
  width: ${({ size, autoSize }) =>
    autoSize ? '100%' : buttonStyles[size].width};
  background: ${({ theme, primary }) =>
    primary ? theme.colors.black : theme.colors.white};
  color: ${({ theme, primary }) =>
    primary ? theme.colors.white : theme.colors.black};
  border: ${({ theme, border }) =>
    border ? `1px solid ${theme.colors.gray300}` : 'none'};

  &:disabled {
    cursor: not-allowed;
    background: ${({ theme }) => theme.colors.gray200};
  }
`;

export default Button;
