import React from 'react';
import styled, { css, DefaultTheme } from 'styled-components';
import { Colors } from 'styles/theme';

type Weight = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 'normal' | 'bold';
type Align = 'start' | 'end' | 'center' | 'jusitfy';

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

export const EllipsisText = styled(Text)`
  width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

export default Text;
