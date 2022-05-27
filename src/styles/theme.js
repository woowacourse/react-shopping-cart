const COLORS = {
  BLACK: '#000000',
  WHITE: '#FFFFFF',
  GRAY_100: '#F6F6F6',
  GRAY_200: '#F3F3F3',
  GRAY_230: '#e0e0e0',
  GRAY_260: '#ededed',
  GRAY_300: '#DDDDDD',
  GRAY_400: '#AAAAAA',
  GRAY_500: '#555555',
  BLUE_100: '#0066FF',
  BROWN_100: '#84786D',
  BROWN_200: '#73675C',
};

const GRADIENT = {
  GRAY: `linear-gradient(
    90deg,
    ${COLORS.GRAY_230} 0px,
    ${COLORS.GRAY_260} 30px,
    ${COLORS.GRAY_230} 60px
  );`,
};

const BRAND_COLORS = {};

export { COLORS, BRAND_COLORS, GRADIENT };
