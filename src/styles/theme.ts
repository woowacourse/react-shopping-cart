import { DefaultTheme } from 'styled-components';

export const colors = {
  primaryBlack: '#333333',
  white: '#ffffff',
  green: '#04c09e',
};

const size = {
  mobileS: '320px',
  mobileM: '375px',
  mobileL: '425px',
  tablet: '768px',
  laptop: '1024px',
  laptopL: '1440px',
  desktop: '2560px',
};

export const device = {
  /**
   *  mobileS: '320px',
   */
  mobileS: `(max-width: ${size.mobileS})`,
  /**
   *   mobileM: '375px',
   */
  mobileM: `(max-width: ${size.mobileM})`,
  /**
   *   mobileL: '425px',
   */
  mobileL: `(max-width: ${size.mobileL})`,
  /**
   *   tablet: '768px',
   */
  tablet: `(max-width: ${size.tablet})`,
  /**
   *   laptop: '1024px',
   */
  laptop: `(max-width: ${size.laptop})`,
  /**
   *   laptopL: '1440px',
   */
  laptopL: `(max-width: ${size.laptopL})`,
  /**
   *   desktop: '2560px',
   */
  desktop: `(max-width: ${size.desktop})`,
};

export type ColorType = typeof colors;

export const theme: DefaultTheme = {
  colors,
  device,
};
