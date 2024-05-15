import { atom, atomFamily } from "recoil";

export const cartSelectedState = atom<number[]>({
  key: "cartSelectedState",
  default: [],
});

export const cartQuantityState = atomFamily<number, number>({
  key: "cartQuantityState",
  default: 0,
});

export const cartPriceState = atomFamily<number, number>({
  key: "cartPriceState",
  default: 0,
});
