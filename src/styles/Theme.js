const size = {
  mobile: '480px',
  tablet: '600px',
  desktop: '1024px',
};

export default {
  mainColor: '#2AC1BC',
  buttonDefault: '#73675C',

  textColorWhite: '#ffffff',

  // responsive
  mobile: `@media (max-width: ${size.mobile})`,
  tablet: `@media (min-width: ${size.tablet})`,
  desktop: `@media (min-width: ${size.desktop})`,

  innerWidth: '1100px',
};
