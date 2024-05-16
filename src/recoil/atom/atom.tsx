import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { Product } from "../../types";

const { persistAtom } = recoilPersist();

export const cartItemsAtom = atom<Product[]>({
  key: "cartItemsAtom",
  default: [],
});

// 카트아이템 -> 체크id들
export const cartItemCheckedIdsAtom = atom<number[]>({
  key: "cartItemCheckedIdsAtom",
  default: [],
  effects_UNSTABLE: [persistAtom],
});
