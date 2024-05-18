import { atom, atomFamily } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const checkedCartItemsState = atom<number[]>({
  key: "checkedCartItemsState",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const cartItemQuantityStates = atomFamily<number, number>({
  key: "cartItemQuantityStates",
  default: 1,
});

export const cartItemPriceStates = atomFamily<number, number>({
  key: "cartItemPriceStates",
  default: 0,
});
