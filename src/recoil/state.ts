import type { CartType } from "../types";
import { atom, selector } from "recoil";

export const cartState = atom<CartType>({
  key: "cartState",
  default: [],
});

export const cartCountState = selector<number>({
  key: "cartCountState",
  get: ({ get }) => get(cartState).length,
});
