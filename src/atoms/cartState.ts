import { atom, selector } from "recoil";
import { getCartData } from "../api/cart";

import type { CartType } from "../type/cart";

export const cartState = atom<CartType[]>({
  key: "cartState",
  default: [],
});

export const cartData = selector({
  key: "cartData",
  get: async () => {
    const data = await getCartData();
    return data;
  },
});

export const totalCartCount = selector({
  key: "totalCartCount",
  get: ({ get }) => {
    const cart = get(cartData);
    return cart.length;
  },
});

export const productPriceState = atom({
  key: "productPriceState",
  default: {},
});
