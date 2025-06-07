import { DEFAULT_SHIPPING_FEE, FREE_SHIPPING_THRESHOLD } from "../constants";

/**
 * 주문 금액에 따른 배송비 계산
 */
export const calculateShippingFee = (orderPrice: number): number => {
  if (orderPrice === 0) return 0;
  return orderPrice >= FREE_SHIPPING_THRESHOLD ? 0 : DEFAULT_SHIPPING_FEE;
};
