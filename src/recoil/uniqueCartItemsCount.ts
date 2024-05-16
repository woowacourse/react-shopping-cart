import { selector } from "recoil";
import { rawCartItemsState } from "./rawCartItems";

export const uniqueCartItemsCountState = selector({
  key: "uniqueCartItemsCountState",
  get: async ({ get }) => {
    const rawCartItems = get(rawCartItemsState);
    return rawCartItems.length;
  },
});
