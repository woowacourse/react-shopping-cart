const MIRACLE_SALE_DISCOUNT_RATE = 0.3;

export const calculateMiracleSaleDiscount = (orderPrice: number) => {
  return orderPrice * MIRACLE_SALE_DISCOUNT_RATE;
};
