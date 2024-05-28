import { setLocalStorage } from "@/utils/localStorage";
import { AtomEffect, atom } from "recoil";

const localStorageEffectForItem =
  (): AtomEffect<number[]> =>
  ({ onSet }) => {
    onSet((newValue) => {
      setLocalStorage("selectedItems", newValue);
    });
  };

export const selectedCartItemsIdState = atom<number[]>({
  key: "selectedCartItems",
  default: [],
  effects: [localStorageEffectForItem()],
});
