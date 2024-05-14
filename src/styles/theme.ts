import { DefaultTheme } from 'styled-components';

const theme: DefaultTheme = {
  typography: {
    heading: `
      font-family: Noto Sans;
      font-size: 2rem;
      font-weight: 800;
      line-height: 1.6rem;
    `,
    pageTitle: `
      font-family: Noto Sans KR;
      font-size: 2.4rem;
      font-weight: 700;
      line-height: 3.475rem;
    `,
    label: `
      font-family: Noto Sans;
      font-size: 1.2rem;
      font-weight: 500;
      line-height: 1.5rem;
    `,
    price: `
      font-family: Noto Sans KR;
      font-size: 2.4rem;
      font-weight: 700;
      line-height: 3.475rem;
    `,
    boldLabel: `
      font-family: Noto Sans;
      font-size: 1.6rem;
      font-weight: 700;
      line-height: 1.6rem;
    `,
  },
  color: {
    black: '#000000',
    white: '#ffffff',
    lightGray: '#BEBEBE',
  },
};

export default theme;
