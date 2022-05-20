export const PALETTE = {
  WHITE_001: '#fff',
  BLACK_001: '#333',
  MINT_001: '#2AC1BC',
  MINT_002: '#22a6a2',
  SKY_BLUE_001: '#93E0DD',
  GRAY_001: 'rgba(0, 0, 0, 0.3)',
  GRAY_002: '#AAA',
  GRAY_003: '#DDD',
  GRAY_004: '#BBB',
  GRAY_005: '#CCC',
  BROWN_001: '#73675C',
};

const usingColor = {
  headerFont: PALETTE.WHITE_001,
  defaultFont: PALETTE.BLACK_001,
  headerBackground: PALETTE.MINT_001,
  shadow: PALETTE.GRAY_001,
  shoppingCartIcon: PALETTE.BLACK_001,
  selectedShoppingCartIcon: PALETTE.MINT_001,
  loadingSpinner: PALETTE.MINT_001,
};

const theme = { usingColor, PALETTE };

export default theme;
