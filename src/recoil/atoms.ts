import { atom } from "recoil";
import { CartItem } from "../types";

export const cartItemsState = atom<CartItem[]>({
  key: "cartItemsState",
  default: [],
});

export const selectedItemsState = atom<Set<number>>({
  key: "selectedItemsState",
  default: new Set(),
});

export const isAllSelectedState = atom<boolean>({
  key: "isAllSelectedState",
  default: false,
});

export const cartItemsCountState = atom<number>({
  key: "cartItemsCount",
  default: 0,
});
