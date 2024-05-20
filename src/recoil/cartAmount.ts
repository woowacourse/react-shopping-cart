import { selector } from "recoil";
import { cartItemsState } from "./cartItems";

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

export const deliveryCostState = selector({
  key: "deliveryCostState",
  get: async ({ get }) => {
    const orderAmount = get(orderAmountState);

    if (orderAmount === 0) {
      return 0;
    }
    if (orderAmount >= 100_000) {
      return 0;
    }
    return 3000;
  },
});

export const totalOrderAmountState = selector({
  key: "totalOrderAmountState",
  get: ({ get }) => {
    const orderAmount = get(orderAmountState);
    const deliveryCost = get(deliveryCostState);
    return orderAmount + deliveryCost;
  },
});
