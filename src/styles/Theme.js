export const deviceSizeStandard = {
  mobile: 480,
  tablet: 800,
  desktop: 1024,
};

export const color = {
  NAVY: '#141852',
  WHITE: '#ffffff',
  DARK_GRAY: '#333333',
  LIGHT_GRAY: '#aaaaaa',
  NEAR_WHITE_01: '#e0e0e0',
  NEAR_WHITE_02: '#ededed',
  BLACK: '#000000',
};

export default {
  colorConfig: {
    primary: color.NAVY,
    secondary: color.LIGHT_GRAY,
    textWhite: color.WHITE,
    skeleton: color.NEAR_WHITE_01,
  },

  // responsive
  mobile: `@media (max-width: ${deviceSizeStandard.mobile}px)`,
  tablet: `@media (max-width: ${deviceSizeStandard.tablet}px)`,
  desktop: `@media (min-width: ${deviceSizeStandard.desktop}px)`,

  innerWidth: '1100px',
  minWidth: '300px',
};
