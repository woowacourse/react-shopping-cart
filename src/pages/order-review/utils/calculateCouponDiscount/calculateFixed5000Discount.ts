const FIXED5000_DISCOUNT_THRESHOLD = 100_000;
const FIXED5000_DISCOUNT_AMOUNT = 5_000;

export const calculateFixed5000Discount = (orderPrice: number) => {
  if (orderPrice >= FIXED5000_DISCOUNT_THRESHOLD) {
    return FIXED5000_DISCOUNT_AMOUNT;
  }
  return 0;
};
