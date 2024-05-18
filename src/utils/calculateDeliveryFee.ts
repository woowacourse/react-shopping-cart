const DELIVERY_FEE = 3000;
export const DELIVERY_FEE_DISCOUNT_THRESHOLD = 100000;

export const calculateDeliveryFee = (cartItemTotalPrice: number) => {
  if (cartItemTotalPrice === 0) return 0;
  return cartItemTotalPrice >= DELIVERY_FEE_DISCOUNT_THRESHOLD ? 0 : DELIVERY_FEE;
};
