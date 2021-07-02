import { css, Theme } from '@emotion/react';
import styled from '@emotion/styled';
import COLOR from './constants/color';

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
    primary: COLOR.BAEMIN,
    secondary: COLOR.GRAY_900,
    lightGrey: COLOR.GRAY_800,
    darkBrown: COLOR.BROWN_300,
  },
  color: {
    defaultBlack: COLOR.BLACK_300,
  },
  textColor: {
    defaultWhite: COLOR.WHITE,
    defaultGrey: COLOR.GRAY_400,
  },
  borderColor: {
    darkGrey: COLOR.GRAY_500,
    defaultGrey: COLOR.GRAY_600,
    lightGrey: COLOR.GRAY_700,
  },
};

export default Styled;
