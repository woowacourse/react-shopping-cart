import { atom, atomFamily } from "recoil";
import { recoilPersist } from "recoil-persist";
import { Product } from "../types";

const { persistAtom } = recoilPersist();

export const cartItemsAtom = atom<Product[]>({
  key: "cartItemsAtom",
  default: [],
});

export const cartItemCheckedIdsAtom = atom<number[]>({
  key: "cartItemCheckedIdsAtom",
  default: [],
  effects_UNSTABLE: [persistAtom],
});
