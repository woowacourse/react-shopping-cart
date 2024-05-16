import { AtomEffect, atomFamily, selector } from "recoil";

import { cartItems } from "./cartItems";

const SELECTED_ITEM_STORAGE_KEY = "selectedItems";

const localStorageEffectForItem =
  (id: number): AtomEffect<boolean> =>
  ({ setSelf, onSet }) => {
    const savedValue = localStorage.getItem(SELECTED_ITEM_STORAGE_KEY);

    if (savedValue) {
      const selectedItems: number[] = JSON.parse(savedValue);
      setSelf(selectedItems.includes(id));
    }

    onSet((newValue) => {
      const savedValue = localStorage.getItem(SELECTED_ITEM_STORAGE_KEY);

      const selectedItems: number[] = savedValue ? JSON.parse(savedValue) : [];

      const updatedItems = newValue
        ? [...selectedItems, id]
        : selectedItems.filter((itemId) => itemId !== id);

      localStorage.setItem(
        SELECTED_ITEM_STORAGE_KEY,
        JSON.stringify(updatedItems)
      );
    });
  };

export const selectedCartItems = atomFamily<boolean, number>({
  key: "selectedCartItems",
  default: false,
  effects: (id) => [localStorageEffectForItem(id)],
});

export const isAllItemSelectedSelector = selector({
  key: "isAllItemSelectedSelector",
  get: ({ get }) => {
    const cartItemList = get(cartItems);
    return cartItemList.every((item) => get(selectedCartItems(item.id)));
  },
});
