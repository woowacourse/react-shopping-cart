export const deviceSizeStandard = {
  mobile: 480,
  tablet: 800,
  desktop: 1024,
};

export default {
  mainColor: '#141852',
  buttonDefault: '#73675C',

  textColorWhite: '#ffffff',

  // responsive
  mobile: `@media (max-width: ${deviceSizeStandard.mobile}px)`,
  tablet: `@media (max-width: ${deviceSizeStandard.tablet}px)`,
  desktop: `@media (min-width: ${deviceSizeStandard.desktop}px)`,

  innerWidth: '1100px',
  minWidth: '300px',
};
