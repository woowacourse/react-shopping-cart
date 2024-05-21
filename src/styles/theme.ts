import { css } from "styled-components";

const COLOR = {
  grey: "#0000001A",
  "grey-2": "#bebebe",
  "grey-3": "#333333",
  white: "#ffffff",
  black: "#000000",
};

const TEXT = {
  Title: css`
    font-size: 20px;
    line-height: 16px;
    font-weight: 800;
  `,
  Subtitle: css`
    font-size: 12px;
    line-height: 15px;
  `,
};

export const theme = {
  COLOR,
  TEXT,
};

export type ThemeType = typeof theme;
