import { atom, selector } from "recoil";
import { getCartItems } from "@/apis/cart";
import { CartItem } from "@/types/cart";

export const cartItemsStateResponse = selector<CartItem[]>({
  key: "cartItemsStateResponse",
  get: async () => {
    const cartItems = await getCartItems();

    return cartItems;
  },
});

export const cartItemsState = atom<CartItem[]>({
  key: "cartItemsState",
  default: cartItemsStateResponse,
});
