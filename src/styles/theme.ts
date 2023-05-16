import { DefaultTheme } from 'styled-components';

export const colors = {
  primaryBlack: '#333333',
  white: '#ffffff',
  green: '#04c09e',
};

export type ColorType = typeof colors;

export const theme: DefaultTheme = {
  colors,
};
