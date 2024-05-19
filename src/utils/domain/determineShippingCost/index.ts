import { FREE_SHIPPING_THRESHOLD, SHIPPING_COST } from "../../../constants/pricing";

type ShoppingCost = number;
export const determineShippingCost = (orderAmount: number): ShoppingCost => {
  if (orderAmount === 0) {
    return 0;
  }

  if (orderAmount >= FREE_SHIPPING_THRESHOLD) {
    return 0;
  }

  return SHIPPING_COST;
};
