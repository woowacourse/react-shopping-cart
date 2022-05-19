import { ButtonHTMLAttributes } from 'react';
import styled, { css } from 'styled-components';
import theme from 'styles/theme';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  width: string;
  height: string;
  backgroundColor?: keyof typeof theme.colors;
  borderColor?: string;
  fontSize?: string;
  color?: string;
}

const Button = ({ children, ...props }: React.PropsWithChildren<ButtonProps>) => {
  return <StyledButton {...props}>{children}</StyledButton>;
};

export default Button;

const StyledButton = styled.button<ButtonProps>`
  background-color: ${({ theme, backgroundColor }) => theme.colors[backgroundColor]};
  color: white;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  ${({ width, height, fontSize, color, backgroundColor, borderColor, theme }) => css`
    width: ${width};
    height: ${height};
    font-size: ${fontSize || 'inherit'};
    color: ${color || 'inherit'};
    border: ${borderColor && `1px solid ${borderColor}`};
    background-color: ${theme.colors[backgroundColor] || 'transparent'};
  `}
`;
