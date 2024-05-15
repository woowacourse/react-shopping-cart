import { selector } from "recoil";
import { itemEachCheckState, itemIdsState } from "../atom/atoms";
import { fetchProducts } from "../api";

export const cartState = selector({
  key: "cartState",
  get: async () => {
    const products = await fetchProducts("GET");
    return products.content;
  },
});

export const checkAllItemState = selector({
  key: "checkAllItemState",
  get: ({ get }) => {
    const itemIds = get(itemIdsState);
    return itemIds.every((itemId) => get(itemEachCheckState(itemId)));
  },
  set: ({ set, get }, newValue) => {
    const itemIds = get(itemIdsState);
    itemIds.forEach((itemId) => set(itemEachCheckState(itemId), newValue));
  },
});
