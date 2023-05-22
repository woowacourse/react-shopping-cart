import { atom, selector } from "recoil";
import { getCartData } from "../api/cart";

import type { CartType } from "../type/cart";

export const cartState = atom<CartType[]>({
  key: "cartState",
  default: selector({
    key: "cartData",
    get: async () => {
      const data = await getCartData();
      return data;
    },
  }),
});

export const totalCartCount = selector({
  key: "totalCartCount",
  get: ({ get }) => {
    const cart = get(cartState);
    return cart.length;
  },
});
