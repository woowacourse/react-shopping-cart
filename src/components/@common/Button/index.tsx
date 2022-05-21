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
  cursor: pointer;
  padding: 0;

  ${({ theme, w, h, borderWidth, borderStyle, borderColor, bgColor }: ButtonProps) => css`
    width: ${w};
    height: ${h};

    border-width: ${borderWidth};
    border-style: ${borderStyle};
    border-color: ${borderColor && theme.colors[borderColor]};
    background-color: ${({ theme }) => bgColor && theme.colors[bgColor]};
  `}
`;

export const CartButton = styled(Button)`
  :hover {
    svg path {
      fill: ${({ theme }) => theme.colors.mint};
    }
  }
`;

export const CartDetailButton = styled(Button)`
  ${({ theme }) => css`
    width: 100%;
    height: 60px;

    font-size: 20px;
    font-weight: 700;
    background: ${theme.colors.gray};
    color: ${theme.colors.white};

    :hover {
      background: ${theme.colors.mint};
    }
  `}
`;

export const OrderButton = styled(Button)`
  ${({ theme }) => css`
    font-size: 24px;
    color: ${theme.colors.white};

    :hover {
      background: ${theme.colors.mint};
    }
  `}
`;

export default Button;
