import { selector } from "recoil";
import { getCartItems } from "../../apis";
import { CartItemType } from "../../types";

export const cartItems = selector<CartItemType[]>({
  key: "cartItems",
  get: async () => {
    const cartItems = await getCartItems();

    return cartItems;
  },
});
