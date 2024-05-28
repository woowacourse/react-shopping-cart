import { getCartItems } from "@/apis/cart";
import { CartItem } from "@/types/cart";
import { atom, selector } from "recoil";

export const cartItemSelector = selector<CartItem[]>({
  key: "cartItemSelector",
  get: async () => {
    const cartItems = await getCartItems();
    return cartItems;
  },
});

export const cartItemsState = atom<CartItem[]>({
  key: "cartItemsState",
  default: cartItemSelector,
});
