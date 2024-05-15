import { atom, atomFamily } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const cartSelectedState = atom<number[]>({
  key: "cartSelectedState",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const cartQuantityState = atomFamily<number, number>({
  key: "cartQuantityState",
  default: 1,
});

export const cartPriceState = atomFamily<number, number>({
  key: "cartPriceState",
  default: 0,
});
