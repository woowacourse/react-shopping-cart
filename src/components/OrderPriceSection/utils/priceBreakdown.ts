export interface PriceInfo {
  orderPrice: number;
  deliveryPrice: number;
  couponDiscount: number;
  totalPrice: number;
}

export const calculatePriceInfo = (
  orderPrice: number,
  deliveryPrice: number,
  couponDiscount: number = 0
): PriceInfo => {
  return {
    orderPrice,
    deliveryPrice,
    couponDiscount,
    totalPrice: orderPrice + deliveryPrice - couponDiscount,
  };
};
