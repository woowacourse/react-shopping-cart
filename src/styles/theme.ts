import { css } from 'styled-components';

type Args = string[];

const sizes = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
};

const theme = {
  colors: {
    emerald: '#29C2BC',
    white: '#FFFFFF',
    gray: '#AAAAAA',
    black: '#161616',
    brown: '#73675C',
  },
  zPriorities: {
    overEverything: 50,
    front: 1,
    middle: 0,
    behind: -1,
  },
  media: {
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
  },
} as const;

export default theme;
