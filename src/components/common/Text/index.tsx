import React from 'react';
import styled, { css, DefaultTheme } from 'styled-components';
import { Colors } from 'styles/theme';

type Weight = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 'normal' | 'bold';
type Align = 'start' | 'end' | 'center' | 'jusitfy';

interface TextProp {
  theme: DefaultTheme;
  size?: number;
  weight?: Weight;
  color?: keyof Colors;
  align?: Align;
}

const Text = styled.div`
  ${({ theme, size, weight, color, align }: TextProp) => css`
    font-size: ${size}px;
    font-weight: ${weight};
    color: ${color && theme.colors[color]};
    text-align: ${align};
  `}
`;

export default Text;
