import { DefaultTheme } from 'styled-components';

const color = {
  white: '#FFFFFF',
  primary: '#333333',
  secondary: '#fed777',
  gray: '#CCCCCC',
};

const font = {
  product: 'normal 400 16px/22px BM-HANNA',
  header: 'normal 900 40px/58px BM-HANNA',
  price: 'normal 400 20px/26px BM-HANNA',
  emphasizeFont: 'normal 700 20px/27px BM-HANNA',
  subTitle: 'normal 400 24px/33px BM-HANNA',
  title: 'normal 700 32px/38px BM-HANNA',
};

const theme: DefaultTheme = {
  color,
  font,
};

export default theme;
