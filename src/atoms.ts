import { atom } from "recoil";
import { Id } from "./types/Product";

export const cartListState = atom<CartItem[]>({
  key: "cartListState",
  default: [],
});
