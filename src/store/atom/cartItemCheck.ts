import { atomFamily, atom, selector } from "recoil";
import { cartState } from "../selector/cartState";

export const itemEachCheckState = atomFamily<boolean, number>({
  key: "itemEachCheckState",
  default: true,
});

export const itemIdsState = atom<number[]>({
  key: "itemIdsState",
  default: selector({
    key: "itemIdsList",
    get: ({ get }) => {
      return get(cartState).map((item: Product) => item.id);
    },
  }),
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
