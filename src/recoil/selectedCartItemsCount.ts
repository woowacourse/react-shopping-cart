import { selector } from "recoil";
import { cartItemsState } from "./cartItems";

export const selectedCartItemsCountState = selector({
  key: "selectedCartItemsCountState",
  get: async ({ get }) => {
    const cartItems = get(cartItemsState);
    const selectedCount = cartItems.reduce(
      (count, cartItem) => (cartItem.isSelected ? count + cartItem.quantity : count),
      0
    );
    return selectedCount;
  },
});
