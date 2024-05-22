import { DefaultValue, atom, selector } from "recoil";
import { cartIdSetSelector } from "./a.test";

const isEqual = (aSet: Set<number>, bSet: Set<number>) =>
  aSet.size === bSet.size && [...aSet].every((num) => bSet.has(num));
const filterIn = (aSet: Set<number>, bSet: Set<number>) => new Set([...aSet].filter((num) => bSet.has(num)));

const checkedIdSetAtom = atom<Set<number>>({ key: "checkedIdListAtom", default: new Set() });
export const checkedIdSetSelector = selector({
  key: "checkedIdSetSelector",
  get: ({ get }) => {
    const checkedIdSet = get(checkedIdSetAtom);
    const cartIdSet = get(cartIdSetSelector);
    return filterIn(checkedIdSet, cartIdSet);
  },
  set: ({ get, set }, newValue) => {
    if (newValue instanceof DefaultValue) return;
    const cartIdSet = get(cartIdSetSelector);
    set(checkedIdSetAtom, filterIn(newValue, cartIdSet));
  },
});

export const isAllCheckedSelector = selector({
  key: "isAllCheckedSelector",
  get: ({ get }) => isEqual(get(checkedIdSetSelector), get(cartIdSetSelector)),
  set: ({ get, set }, newValue) => {
    if (newValue instanceof DefaultValue) {
      set(checkedIdSetSelector, new Set());
      return;
    }
    if (newValue) {
      set(checkedIdSetSelector, get(cartIdSetSelector));
      return;
    }
    set(checkedIdSetAtom, new Set());
  },
});
