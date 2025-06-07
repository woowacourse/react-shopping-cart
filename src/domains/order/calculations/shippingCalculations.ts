const FREE_SHIPPING_THRESHOLD = 100_000;
const DEFAULT_SHIPPING_FEE = 3_000;

/**
 * 주문 금액에 따른 배송비 계산
 */
export const calculateShippingFee = (orderPrice: number): number => {
  if (orderPrice === 0) return 0;
  return orderPrice >= FREE_SHIPPING_THRESHOLD ? 0 : DEFAULT_SHIPPING_FEE;
};
