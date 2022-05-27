import { css } from 'styled-components';

type Args = string[];

const sizes = {
  sm: 320,
  md: 490,
  lg: 890,
  xl: 1280,
};

const media = {
  sm: (...args: Args) =>
    css`
      @media only screen and (max-width: ${sizes.md}px) {
        ${args}
      }
    `,
  md: (...args: Args) =>
    css`
      @media only screen and (min-width: ${sizes.md}px) and (max-width: ${sizes.lg}px) {
        ${args}
      }
    `,
  lg: (...args: Args) =>
    css`
      @media only screen and (min-width: ${sizes.lg}px) and (max-width: ${sizes.xl}px) {
        ${args}
      }
    `,
  xl: (...args: Args) =>
    css`
      @media only screen and (min-width: ${sizes.xl}px) {
        ${args}
      }
    `,
};

const theme = {
  media,
  colors: {
    red: '#ff413b',
    redPink: '#ff9c9c',
    pink: '#ffc2c2',
    white: '#FFFFFF',
    gray: '#AAAAAA',
    lightGray: '#dddddd',
    black: '#161616',
    brown: '#73675C',
  },
  zPriorities: {
    overEverything: 50,
    front: 1,
    middle: 0,
    behind: -1,
  },
} as const;

export default theme;
