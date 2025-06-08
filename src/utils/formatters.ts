export const formatPrice = (price: number): string => {
  return price.toLocaleString("ko-KR");
};

export const formatPriceWithUnit = (price: number): string => {
  return `${formatPrice(price)}원`;
};

export const formatNumber = (num: number): string => {
  return num.toLocaleString("ko-KR");
};
