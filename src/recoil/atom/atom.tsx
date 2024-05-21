import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { CartItem } from "../../types";
import { fetchCartItemListSelector } from "../selector/selector";

const { persistAtom } = recoilPersist();

export const cartItemListAtom = atom<CartItem[]>({
  key: "cartItemListAtom",
  default: fetchCartItemListSelector,
});

export const checkedIdListAtom = atom<Array<number>>({
  key: "checkedIdListAtom",
  default: [],
  effects: [persistAtom],
});
