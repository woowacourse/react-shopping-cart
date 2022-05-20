const COLOR = {
  BLACK: '#333333',
  MINT: '#2AC1BC',
  DARK_MINT: '#22A6A2',
  WHITE: '#ffffff',
  BROWN: '#73675C',
  GRAY_BROWN: '#73675C',
  GRAY_700: '#AAAAAA',
  GRAY_600: '#CCCCCC',
  GRAY_500: '#DDDDDD',
  GRAY_400: '#F6F6F6',
  GRAY_300: '#E5E5E5',
};

const FONT_SIZE = {
  XS: '16px',
  S: '20px',
  M: '24px',
  L: '32px',
};

const deviceSizes = {
  mobile: '425px',
  tablet: '768px',
  laptop: '1024px',
};

const DEVICE = {
  mobile: `screen and (max-width: ${deviceSizes.mobile})`,
  tablet: `screen and (max-width: ${deviceSizes.tablet})`,
  laptop: `screen and (max-width: ${deviceSizes.laptop})`,
};

const theme = {
  COLOR,
  FONT_SIZE,
  DEVICE,
};

export default theme;
