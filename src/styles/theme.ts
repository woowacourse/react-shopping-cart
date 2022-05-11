import { css } from 'styled-components';

type Args = string[];

const sizes = {
  sm: 320,
  md: 890,
  lg: 1280,
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
      @media only screen and (min-width: ${sizes.lg}px) {
        ${args}
      }
    `,
};

const theme = {
  media,
  colors: {
    emerald: '#29C2BC',
    white: '#FFFFFF',
    gray: '#AAAAAA',
    black: '#333333',
    brown: '#73675C',
  },
} as const;

export default theme;
