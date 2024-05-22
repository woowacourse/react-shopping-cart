import { atom, selector } from "recoil";
import { getCartItems } from "@/apis/cart";
import { CartItem } from "@/types/cart";

export const cartItemsState = selector<CartItem[]>({
  key: "cartItemsState",
  get: async () => {
    const cartItems = await getCartItems();
    return cartItems;
  },
});
