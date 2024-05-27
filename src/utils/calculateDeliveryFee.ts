const DELIVERY_FEE = 3_000;
export const DELIVERY_FEE_DISCOUNT_THRESHOLD = 100_000;

export const calculateDeliveryFee = (cartItemTotalPrice: number, isSigol: boolean) => {
  if (cartItemTotalPrice === 0 || cartItemTotalPrice >= DELIVERY_FEE_DISCOUNT_THRESHOLD) return 0;
  return isSigol ? DELIVERY_FEE * 2 : DELIVERY_FEE;
};
