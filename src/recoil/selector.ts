import { selector } from "recoil";
import { ItemType } from "../types/domain";
import { itemsState } from "./atom";

export const itemCountSelector = selector({
  key: "itemCount",
  get: ({ get }) => {
    return get(itemsState).filter((item: ItemType) => item.count).length;
  },
  set: ({ get, set }, newItem) => {
    const items = get(itemsState);
    const newItems = items.map((item: ItemType) =>
      item.id === newItem.id ? { ...item, count: newItem.count } : item
    );

    return set(itemsState, newItems);
  },
});
