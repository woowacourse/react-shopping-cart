export const DELIVERY_FEE_DISCOUNT_THRESHOLD = 100000;
const DELIVERY_FEE = 3000;

export const calculateDeliveryFee = (cartItemTotalPrice: number) => {
  return cartItemTotalPrice === 0 || cartItemTotalPrice >= DELIVERY_FEE_DISCOUNT_THRESHOLD ? 0 : DELIVERY_FEE;
};
