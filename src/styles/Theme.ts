export const size = {
  mobile: 480,
  tablet: 800,
  desktop: 1024,
};

export default {
  mainColor: '#141852',
  buttonDefault: '#73675C',

  textColorWhite: '#ffffff',

  mobile: `@media (max-width: ${size.mobile}px)`,
  tablet: `@media (max-width: ${size.tablet}px)`,
  desktop: `@media (min-width: ${size.desktop}px)`,

  innerWidth: '1100px',
  minWidth: '300px',
};
