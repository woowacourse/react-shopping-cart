import { CART_RULE } from '..';

export const calculateDeliveryFee = (
  orderPrice: number,
  isRemoteArea: boolean
) => {
  if (isRemoteArea) {
    if (orderPrice >= CART_RULE.freeDeliveryThreshold) {
      return CART_RULE.remoteAreaDeliveryFee;
    }
    return CART_RULE.remoteAreaDeliveryFee + CART_RULE.defaultDeliveryFee;
  }
  if (orderPrice >= CART_RULE.freeDeliveryThreshold) {
    return 0;
  }
  return CART_RULE.defaultDeliveryFee;
};
