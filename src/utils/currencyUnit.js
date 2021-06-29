export const currencyUnit = (price) =>
  price && price.toLocaleString('ko-KR', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
