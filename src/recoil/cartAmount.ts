import { selector } from "recoil";
import { cartItemsState } from "./cartItems";
import { FREE_SHIPPING_THRESHOLD, SHIPPING_COST } from "../constants/pricing";

export const orderAmountState = selector({
  key: "orderAmountState",
  get: async ({ get }) => {
    const cartItems = get(cartItemsState);
    const orderAmount = cartItems.reduce(
      (amount, { isSelected, quantity, product }) =>
        isSelected ? amount + quantity * product.price : amount,
      0
    );
    return orderAmount;
  },
});

export const shippingCostState = selector({
  key: "shippingCostState",
  get: async ({ get }) => {
    const orderAmount = get(orderAmountState);

    if (orderAmount === 0) {
      return 0;
    }
    if (orderAmount >= FREE_SHIPPING_THRESHOLD) {
      return 0;
    }
    return SHIPPING_COST;
  },
});

export const totalOrderAmountState = selector({
  key: "totalOrderAmountState",
  get: ({ get }) => {
    const orderAmount = get(orderAmountState);
    const shippingCost = get(shippingCostState);
    return orderAmount + shippingCost;
  },
});
