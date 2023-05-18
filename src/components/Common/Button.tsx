import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { styled } from 'styled-components';

type ButtonSizeType = 'small' | 'medium';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSizeType;
  autoSize?: boolean;
  primary?: boolean;
  children: ReactNode;
}

const Button = ({
  size = 'medium',
  primary = true,
  autoSize = false,
  children,
  ...args
}: ButtonProps) => {
  return (
    <StyledButton size={size} {...args} primary={primary} autoSize={autoSize}>
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
}>`
  ${({ size }) => buttonStyles[size]}
  width: ${({ size, autoSize }) =>
    autoSize ? '100%' : buttonStyles[size].width};
  background: ${({ theme, primary }) =>
    primary ? theme.colors.black : theme.colors.white};
  color: ${({ theme, primary }) =>
    primary ? theme.colors.white : theme.colors.black};
`;

export default Button;
