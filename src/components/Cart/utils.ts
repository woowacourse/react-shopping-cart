import { PRICE } from '@/constants/config';

export const calculateShippingPrice = (totalOrderPrice: number) => {
  return totalOrderPrice >= PRICE.FREE_SHIPPING_CONDITION ? PRICE.FREE : PRICE.DELIVERY_PRICE;
};
