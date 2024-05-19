import { atomFamily, selectorFamily } from "recoil";

import { cartItems } from "./cartItems";

export const initialCartItemQuantity = selectorFamily<number, number>({
  key: "initialCartItemQuantity",
  get:
    (id) =>
    ({ get }) => {
      const cartItemList = get(cartItems);
      const item = cartItemList.find((item) => item.id === id);

      return item ? item.quantity : 1;
    },
});

export const cartItemQuantity = atomFamily<number, number>({
  key: "itemQuantityState",
  default: initialCartItemQuantity,
});
