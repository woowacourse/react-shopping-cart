import styled, { css, DefaultTheme } from 'styled-components';
import { Colors } from 'styles/theme';

interface ButtonProps {
  theme: DefaultTheme;
  w?: string;
  h?: string;
  borderWidth?: string;
  borderStyle?: string;
  borderColor?: keyof Colors;
  bgColor?: keyof Colors;
}

const Button = styled.button`
  border: none;
  background: none;
  padding: 0;
  cursor: pointer;

  ${({ theme, w, h, borderWidth, borderStyle, borderColor, bgColor }: ButtonProps) => css`
    width: ${w};
    height: ${h};

    border-width: ${borderWidth};
    border-style: ${borderStyle};
    border-color: ${borderColor && theme.colors[borderColor]};
    background-color: ${({ theme }) => bgColor && theme.colors[bgColor]};
  `}
`;

export default Button;
