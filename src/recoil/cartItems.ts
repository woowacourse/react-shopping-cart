import { atom, selector } from "recoil";

import { getCartItems } from "@/apis";

import { CartItem } from "@/types/cart";

export const cartItemSelector = selector<CartItem[]>({
  key: "cartItemSelector",
  get: async () => {
    const cartItems = await getCartItems();
    return cartItems;
  },
});

export const cartItems = atom<CartItem[]>({
  key: "cartItemsAtom",
  default: cartItemSelector,
});
