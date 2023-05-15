const colors = {
  primary: '#04c09e',
  gray100: '#ddd',
  gray200: '#ccc',
  gray300: '#bbb',
  gray400: '#aaa',
  black: '#333',
  white: '#f5f5f5',
} as const;

export type ColorKeys = keyof typeof colors;

const theme = {
  colors,
};

export default theme;
