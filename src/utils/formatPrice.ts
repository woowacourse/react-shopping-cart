export const formatPrice = (price: number): string => {
  return price.toLocaleString();
};

export const formatPriceWithZero = (price: number): string => {
  return isNaN(price) ? "0" : price.toLocaleString();
};
