import { DefaultTheme } from 'styled-components';

const color = {
  white: 'white',
  gray1: '#f8f8f8',
  gray2: '#e9e9e9',
  gray3: '#d6d6d6',
  gray4: '#727272',
  gray5: '#525252',
  gray6: '#363636',
  black: '#0e0e0e',

  primaryLight1: '#f7faf9',
  primary: '#04c09e',
  primaryDark: '#05b696',

  orange: '#ff6610',

  lightRed1: '#fff6f6',
  lightRed2: '#ffecec',
  lightRed3: '#eb7171',
  red: '#ce0000',
  darkRed: '#9f0000',
};

const spacer = {
  spacing1: '4px',
  spacing2: '8px',
  spacing3: '16px',
  spacing4: '24px',
  spacing5: '32px',
  spacing6: '64px',
};

const borderRadius = {
  small: '4px',
  medium: '8px',
};

const theme: DefaultTheme = {
  color,
  spacer,
  borderRadius,
};

export default theme;
