import { AtomEffect, atomFamily, selector } from "recoil";

import { cartItems } from "./cartItems";
import { cartItemQuantity } from "./cartItemQuantity";
import { CartItem } from "@/types/cart";

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

export const selectedCartItemIds = atomFamily<boolean, number>({
  key: "selectedCartItemIds",
  default: false,
  effects: (id) => [localStorageEffectForItem(id)],
});

export const isAllItemSelectedSelector = selector({
  key: "isAllItemSelectedSelector",
  get: ({ get }) => {
    const cartItemList = get(cartItems);
    return cartItemList.every((item) => get(selectedCartItemIds(item.id)));
  },
});

export const selectedCartItemSelector = selector({
  key: "selectedCartItems",
  get: ({ get }) => {
    const cartItemState = get(cartItems);

    return cartItemState.reduce(
      (accSelectedCartItems: CartItem[], currItem: CartItem) => {
        const isSelected = get(selectedCartItemIds(currItem.id));

        return !isSelected
          ? [...accSelectedCartItems]
          : [
              ...accSelectedCartItems,
              {
                ...currItem,
                quantity: get(cartItemQuantity(currItem.id)),
              },
            ];
      },
      []
    );
  },
});

export const selectedCartItemIdsSelector = selector({
  key: "selectedCartItemIdsSelector",
  get: ({ get }) => {
    const selectedCartItems = get(selectedCartItemSelector);

    return selectedCartItems.map((item) => item.id);
  },
});

export const selectedCartItemsQuantitySelector = selector({
  key: "selectedCartItemsQuantitySelector",
  get: ({ get }) => {
    const selectedCartItemIdList = get(selectedCartItemIdsSelector);

    return selectedCartItemIdList.map((id) => {
      return {
        id,
        quantity: get(cartItemQuantity(id)),
      };
    });
  },
});

export const selectedCartItemLengthSelector = selector({
  key: "selectedCartItemLength",
  get: ({ get }) => {
    const selectedCartItems = get(selectedCartItemSelector);

    return selectedCartItems.length;
  },
});

export const selectedCartItemTotalQuantitySelector = selector({
  key: "selectedCartItemTotalQuantity",
  get: ({ get }) => {
    const selectedCartItems = get(selectedCartItemSelector);

    return selectedCartItems.reduce(
      (accQuantity, currItem) => accQuantity + currItem.quantity,
      0
    );
  },
});
