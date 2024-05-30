import { atom, selector } from "recoil";
import { fetchCartItems } from "../api/cartItems";
import { RawCartItem } from "../types/cartItems";

const rawCartItemsSelector = selector({
  key: "rawCartItemsSelector",
  get: async () => {
    const cartItems = await fetchCartItems();
    return cartItems;
  },
});

export const rawCartItemsState = atom<RawCartItem[]>({
  key: "rawCartItemsState",
  default: rawCartItemsSelector,
});
