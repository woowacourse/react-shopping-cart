import { css } from "styled-components";

const COLOR = {
  grey: "#0000001A",
  "grey-2": "#bebebe",
  "grey-3": "#333333",
  white: "#ffffff",
  black: "#000000",
};

const TEXT = {
  xLarge: css`
    font-size: 24px;
    line-height: 18px;
    font-weight: 800;
  `,
  large: css`
    font-size: 20px;
    line-height: 18px;
    font-weight: 800;
  `,
  medium: css`
    font-size: 18px;
    line-height: 18px;
    font-weight: 700;
  `,
  small: css`
    font-size: 16px;
    line-height: 18px;
    font-weight: 700;
  `,
  xSmall: css`
    font-size: 12px;
    line-height: 18px;
    font-weight: 500;
  `,
};

export const theme = {
  COLOR,
  TEXT,
};

export type ThemeType = typeof theme;
