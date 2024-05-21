import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { CartItem } from "../../types";
import { fetchCartItemsSelector } from "../selector/selector";

const { persistAtom } = recoilPersist();

export const cartItemsAtom = atom<CartItem[]>({
  key: "cartItemsAtom",
  default: fetchCartItemsSelector,
});

export const cartItemCheckedIdsAtom = atom<number[]>({
  key: "cartItemCheckedIdsAtom",
  default: [],
  effects: [persistAtom],
});
