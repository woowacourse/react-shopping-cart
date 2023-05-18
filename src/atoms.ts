import { atom, selector } from "recoil";
import { CartItem } from "./types/Cart";
import { fetchCartItem } from "./utils/apis";

const cartListQuerySelector = selector({
  key: "cartListQuerySelector",
  get: async ({ get }) => {
    const data = await fetchCartItem();

    return data;
  },
});

export const cartListState = atom<CartItem[]>({
  key: "cartListState",
  default: cartListQuerySelector,
});
