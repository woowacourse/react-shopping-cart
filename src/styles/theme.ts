const colors = {
  primary: '#04c09e',
  gray100: '#ddd',
  gray200: '#ccc',
  gray300: '#bbb',
  gray400: '#aaa',
  black: '#333',
  white: '#f5f5f5',
} as const;

const breakPoints = {
  small: '540px',
  medium: '780px',
  large: '1200px',
} as const;

export type ColorKeys = keyof typeof colors;

const theme = {
  colors,
  breakPoints,
};

export default theme;
