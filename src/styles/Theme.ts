import { DefaultTheme } from 'styled-components';

export const enum size {
  mobile = 480,
  tablet = 800,
  desktop = 1024,
}

const theme: DefaultTheme = {
  brandColor_1: '#141852',

  mobile: `@media (max-width: ${size.mobile}px)`,
  tablet: `@media (max-width: ${size.tablet}px)`,
  desktop: `@media (min-width: ${size.desktop}px)`,

  innerWidth: '1100px',
  minWidth: '300px',

  blackColor_1: '#333333',
  blackColor_2: '#00000099',

  greyColor_1: '#dddddd',
  greyColor_2: '#aaaaaa',
  greyColor_3: 'rgba(0, 0, 0, 0.5)',

  brownColor_1: '#73675C',

  whiteColor_1: '#ffffff',

  redColor_1: '#fc8a8a',
};

export default theme;
