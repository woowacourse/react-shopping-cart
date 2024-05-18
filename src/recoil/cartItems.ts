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

export const cartItems = atom<CartItem[]>({
  key: "cartItemsAtom",
  default: cartItemSelector,
});
