import React from 'react';
import styled, { css, DefaultTheme } from 'styled-components';
import { Colors } from 'styles/theme';

type Weight = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 'normal' | 'bold';

interface TextProp {
  theme: DefaultTheme;
  size?: number;
  weight?: Weight;
  color: keyof Colors;
}

const Text = styled.div`
  ${({ theme, size, weight, color }: TextProp) => css`
    font-size: ${size}px;
    font-weight: ${weight};
    color: ${theme.colors[color]};
  `}
`;

export default Text;
