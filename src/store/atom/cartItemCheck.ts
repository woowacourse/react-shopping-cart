import { atomFamily, atom, selector } from "recoil";

export const itemEachCheckState = atomFamily<boolean, number>({
  key: "itemEachCheckState",
  default: true,
});

export const itemIdsState = atom<number[]>({
  key: "itemIdsState",
  default: [329, 330, 331],
});

export const checkAllItemState = selector({
  key: "checkAllItemState",
  get: ({ get }) => {
    const itemIds = get(itemIdsState);
    return itemIds.map((itemId) => get(itemEachCheckState(itemId))).every(Boolean);
  },
  set: ({ set, get }, newValue) => {
    const itemIds = get(itemIdsState);
    itemIds.forEach((itemId) => set(itemEachCheckState(itemId), newValue));
  },
});
