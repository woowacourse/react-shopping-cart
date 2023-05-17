import { atom } from "recoil";
import { CartItem } from "./types/Cart";

export const cartListState = atom<CartItem[]>({
  key: "cartListState",
  default: [],
});
