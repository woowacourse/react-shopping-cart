import { atom } from "recoil";
import { CartItem } from "../types";

export const cartItemsState = atom<CartItem[]>({
  key: "cartItemsState",
  default: [],
});
