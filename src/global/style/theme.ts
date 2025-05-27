import { css } from '@emotion/react';

export const theme = {
  heading: css`
    font-size: 28px;
    font-weight: 700;
  `,
  subheading: css`
    font-size: 20px;
    font-weight: 700;
  `,
  title: css`
    font-size: 16px;
    font-weight: 700;
  `,
  body1: css`
    font-size: 16px;
    font-weight: 500;
  `,
  body2: css`
    font-size: 14px;
    font-weight: 500;
  `,
};

export type AppTheme = typeof theme;
