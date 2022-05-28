import React from 'react';
import styled, { css, DefaultTheme, CSSProperties } from 'styled-components';
import { Colors } from 'styles/theme';

type Align = CSSProperties['textAlign'];
type Weight = CSSProperties['fontWeight'];

interface TextProps {
  theme: DefaultTheme;
  align?: Align;
  size?: string;
  weight?: Weight;
  lineHeight?: number;
  color?: keyof Colors;
}

const Text = styled.p`
  ${({ theme, size, weight, color, align, lineHeight }: TextProps) => css`
    text-align: ${align};
    font-size: ${size};
    font-weight: ${weight};
    line-height: ${lineHeight};
    color: ${color && theme.colors[color]};
  `}
`;

export default Text;
