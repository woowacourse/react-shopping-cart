import styled, { css, DefaultTheme } from 'styled-components';
import { Colors } from 'styles/theme';

interface BoxProps {
  theme: DefaultTheme;
  w?: string;
  h?: string;
  borderWidth?: string;
  borderStyle?: string;
  borderColor?: keyof Colors;
  bgColor?: keyof Colors;
}

const Box = styled.div`
  ${({ theme, w, h, borderWidth, borderStyle, borderColor, bgColor }: BoxProps) => css`
    width: ${w};
    height: ${h};

    border-width: ${borderWidth};
    border-style: ${borderStyle};
    border-color: ${borderColor && theme.colors[borderColor]};
    background-color: ${({ theme }) => bgColor && theme.colors[bgColor]};
  `}
`;

export default Box;
