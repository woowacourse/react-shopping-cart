import {
  FREE_SHIPPING_THRESHOLD,
  SHIPPING_COST,
  SHIPPING_COST_FOR_REMOTE,
} from "../../../constants/pricing";

type ShippingCost = number;
export const determineShippingCost = (
  orderAmount: number,
  isRemoteDeliveryArea: boolean = false
): ShippingCost => {
  if (orderAmount === 0) {
    return 0;
  }

  if (orderAmount >= FREE_SHIPPING_THRESHOLD) {
    return 0;
  }

  if (isRemoteDeliveryArea) {
    return SHIPPING_COST_FOR_REMOTE;
  }

  return SHIPPING_COST;
};
