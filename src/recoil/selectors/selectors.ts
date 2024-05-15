import { selector } from "recoil";
import { getCartItems } from "../../apis";
import { CartItemType } from "../../types";
import { refreshedCartItemsState } from "../atoms/atoms";

export const cartItemsState = selector<CartItemType[]>({
  key: "cartItemsState",
  get: async ({ get }) => {
    get(refreshedCartItemsState);
    const cartItems = await getCartItems();

    return cartItems;
  },
});
