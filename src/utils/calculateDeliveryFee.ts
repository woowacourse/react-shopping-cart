import { DEFAULT_DELIVERY_FEE, DELIVERY_FEE_DISCOUNT_THRESHOLD } from '../constants/DELIVERY_INFOS';

export const calculateDeliveryFee = (cartItemTotalPrice: number) => {
  return cartItemTotalPrice === 0 || cartItemTotalPrice >= DELIVERY_FEE_DISCOUNT_THRESHOLD ? 0 : DEFAULT_DELIVERY_FEE;
};
