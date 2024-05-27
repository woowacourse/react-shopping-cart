import { PRICE } from '@/constants/config';

export const calculateShippingPrice = (totalOrderPrice: number, additionalShipping: number = 0) => {
  return totalOrderPrice >= PRICE.FREE_SHIPPING_CONDITION
    ? PRICE.FREE
    : PRICE.DELIVERY_PRICE + additionalShipping;
};
