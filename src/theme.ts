import { DefaultTheme } from 'styled-components';

const theme: DefaultTheme = {
  typography: {
    header: `
      font-family: Noto Sans;
      font-weight: 800;
      font-size: 1.25rem;
      line-height: 1rem;
    `,
    title: `
      font-family: Noto Sans KR;
      font-weight: 700;
      font-size: 1.5rem;
      line-height: 2.17rem;
    `,
    caption: `
      font-family: Noto Sans KR;
      font-weight: 300;
      font-size: 0.75rem;
      line-height: 0.9rem;
    `,
    content: `
    font-family: Noto Sans KR;
    font-weight: 500;
    font-size: 1rem;
    line-height: 1rem;
    `,
    successMessage: `
    font-family: Noto Sans KR;
    font-size: 0.75rem;
    font-weight: 400;
    line-height: 1.125rem;
    `,
    label: `
      font-family: Noto Sans KR;
      font-weight: 700;
      font-size: 1rem;
      line-height: 1rem;
    `,
    price: `
    font-family: Noto Sans KR;
    font-weight: 700;
    font-size: 1.5rem;
    line-height: 2.1719rem;
    `,
  },
  color: {
    black: '#000000',
    white: '#FFFFFF',
    lightGray: '#BEBEBE',
    captionBlack: '#0A0D13',
    borderGray: '#0000001A',
  },
};

export default theme;
