import { css, Theme } from '@emotion/react';
import styled from '@emotion/styled';

const Styled = {
  Page: styled.div`
    padding-top: 80px;
  `,
};

export const globalStyle = css`
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700;900&display=swap');

  body {
    margin: 0;
    padding: 0;
    font-family: 'Noto Sans KR', sans-serif;
  }
`;

export const theme: Theme = {
  bgColor: {
    primary: '#2AC1BC',
    secondary: '#f6f6f6',
    lightGrey: '#e5e5e5',
  },
  color: {
    defaultBlack: '#333333',
  },
  textColor: {
    defaultWhite: '#FFFFFF',
    defaultGrey: '#888888',
  },
  borderColor: {
    darkGrey: '#aaaaaa',
    defaultGrey: '#cccccc',
    lightGrey: '#dddddd',
  },
};

export default Styled;
