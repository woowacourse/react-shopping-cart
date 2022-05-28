import React from 'react';
import styled, { css, DefaultTheme } from 'styled-components';
import { Colors } from 'styles/theme';

interface BarProps {
  theme: DefaultTheme;
  h: string;
  color: keyof Colors;
}

const Bar = styled.div`
  ${({ theme, h, color }: BarProps) => css`
    height: ${h};
    background: ${theme.colors[color]};
  `}
`;

export default Bar;
