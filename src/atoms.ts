import { atom } from "recoil";
import { Id } from "./types/Product";

export const cartListState = atom<Id[]>({
  key: "cartListState",
  default: [],
});
