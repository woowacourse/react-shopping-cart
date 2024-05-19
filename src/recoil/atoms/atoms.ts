import { atom } from "recoil";
import { CartItem } from "../../types";

export const getLocalStorageState = (key: string, defaultValue: object | boolean) => {
  const storedValue = localStorage.getItem(key);
  return storedValue ? JSON.parse(storedValue) : defaultValue;
};

export const cartItemsState = atom<CartItem[]>({
  key: "cartItemsState",
  default: [],
});

export const checkedItemState = atom<Record<number, boolean>>({
  key: "checkedItemState",
  default: getLocalStorageState("checkedItemState", {}),
});

export const isAllCheckedState = atom<boolean>({
  key: "isAllCheckedState",
  default: getLocalStorageState("isAllCheckedState", false),
});

export const totalItemCountState = atom<number>({
  key: "totalItemCountState",
  default: 0,
});
