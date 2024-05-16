import { atom } from "recoil";
import { CartItem } from "../types";

export const getLocalStorageState = (
  key: string,
  defaultValue: object | boolean
) => {
  const storedValue = localStorage.getItem(key);
  return storedValue ? JSON.parse(storedValue) : defaultValue;
};

export const cartItemsState = atom<CartItem[]>({
  key: "cartItemsState",
  default: [],
});

export const selectedItemsState = atom<Record<number, boolean>>({
  key: "selectedItemsState",
  default: getLocalStorageState("selectedItemsState", {}),
});

export const isAllSelectedState = atom<boolean>({
  key: "isAllSelectedState",
  default: getLocalStorageState("isAllSelectedState", false),
});

export const cartItemsCountState = atom<number>({
  key: "cartItemsCount",
  default: 0,
});
