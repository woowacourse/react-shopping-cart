import { FREE_SHIPPING_THRESHOLD, SHIPPING_COST } from "../../../constants/pricing";

type ShoppingCost = number;
export const determineShippingCost = (
  orderAmount: number,
  isRemoteDeliveryArea: boolean = false
): ShoppingCost => {
  if (orderAmount === 0) {
    return 0;
  }

  if (orderAmount >= FREE_SHIPPING_THRESHOLD) {
    return 0;
  }

  if (isRemoteDeliveryArea) {
    return SHIPPING_COST * 2;
  }

  return SHIPPING_COST;
};
