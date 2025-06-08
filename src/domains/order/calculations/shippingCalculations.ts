import { DEFAULT_SHIPPING_FEE, FREE_SHIPPING_THRESHOLD } from "../constants";

export const calculateShippingFee = (orderPrice: number): number => {
  if (orderPrice === 0) return 0;
  return orderPrice >= FREE_SHIPPING_THRESHOLD ? 0 : DEFAULT_SHIPPING_FEE;
};
