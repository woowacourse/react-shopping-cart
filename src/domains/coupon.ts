export const couponPrice = {
  FIXED5000: () => 5000,
  Bogo: (price: number) => price / 3,
  FREESHIPPING: () => 0,
  MIRACLESALE: (price: number) => price * 0.3,
};
