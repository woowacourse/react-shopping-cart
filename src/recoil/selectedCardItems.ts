import { AtomEffect, atom } from "recoil";

const SELECTED_ITEM_STORAGE_KEY = "selectedItems";

const localStorageEffectForItem =
  (): AtomEffect<number[]> =>
  ({ onSet }) => {
    onSet((newValue) => {
      localStorage.setItem(SELECTED_ITEM_STORAGE_KEY, JSON.stringify(newValue));
    });
  };

export const selectedCartItemsIdState = atom<number[]>({
  key: "selectedCartItems",
  default: [],
  effects: [localStorageEffectForItem()],
});
