import { atomFamily, selectorFamily } from "recoil";

import { cartItemsState } from "./cartItems";

export const initialCartItemQuantitySelector = selectorFamily<number, number>({
  key: "initialCartItemQuantity",
  get:
    (id) =>
    ({ get }) => {
      const cartItemList = get(cartItemsState);
      const item = cartItemList.find((item) => item.id === id);

      return item ? item.quantity : 1;
    },
});

export const cartItemQuantityState = atomFamily<number, number>({
  key: "itemQuantityState",
  default: initialCartItemQuantitySelector,
});
