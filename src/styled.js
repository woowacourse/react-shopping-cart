import { css } from "@emotion/react";

export const noneStyles = {
  a: css`
    text-decoration: none;
    color: inherit;
  `,
  ul: css`
    list-style: none;
    padding: 0;
    margin: 0;
    li {
      padding: 0;
      margin: 0;
    }
  `,
  button: css`
    background-color: initial;
    border: none;
    outline: none;
    cursor: pointer;
  `,
};

export const colors = {
  black: ["#000"],
  red: ["#7f0001", "#dd202280"],
  greenLight: ["#00cc00", "#ddff99", "#ddff66"],
};

export const breakpoints = [576, 768, 992, 1320];

export const mq = breakpoints.map((bp) => `@media (min-width: ${bp}px)`);
