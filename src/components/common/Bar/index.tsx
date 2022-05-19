import React from 'react';
import styled, { css, DefaultTheme } from 'styled-components';
import { Colors } from 'styles/theme';

interface BarProp {
  theme: DefaultTheme;
  h: number;
  color: keyof Colors;
}

const Bar = styled.div`
  ${({ theme, h, color }: BarProp) => css`
    height: ${h}px;
    background: ${theme.colors[color]};
  `}
`;

export default Bar;
