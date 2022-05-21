import { LAYOUT } from 'styles/theme';

const getNumberFormatter = (number) => number.toLocaleString('ko-KR');

const getPixelToRem = (size) => (size / LAYOUT.ROOT_PIXEL_SIZE).toFixed(2);

export { getNumberFormatter, getPixelToRem };
