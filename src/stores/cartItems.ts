import { selector } from "recoil";
import { getCartItems } from "../apis";
import { CartItemType } from "../types";

export const cartItemsState = selector<CartItemType[]>({
  key: "cartItemsState",
  get: async () => {
    const cartItems = await getCartItems();
    return cartItems;
  },
});
