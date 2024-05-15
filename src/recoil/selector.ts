import { selector } from "recoil";
import { cartItemsState } from "./atoms";

export const categoryCountState = selector<number>({
  key: "categoryCountState",
  get: ({ get }) => {
    const cartItems = get(cartItemsState);
    return cartItems.length;
  },
});
