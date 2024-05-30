import { atomFamily, selector, selectorFamily } from "recoil";

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

export const cartListQuantitySelector = selector({
  key: "cartItemQuantityOSelector",
  get: ({ get }) => {
    const cartItemList = get(cartItemsState);
    return cartItemList.map((item) => {
      return { item, quantity: get(cartItemQuantityState(item.id)) };
    });
  },
});
