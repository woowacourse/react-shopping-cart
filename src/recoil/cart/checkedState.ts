import { DefaultValue, atom, selector, selectorFamily } from "recoil";
import { cartIdSetSelector } from "./cartItemState";

const isEqual = (aSet: Set<number>, bSet: Set<number>) =>
  aSet.size === bSet.size && [...aSet].every((num) => bSet.has(num));
const filterIn = (aSet: Set<number>, bSet: Set<number>) => new Set([...aSet].filter((num) => bSet.has(num)));

const checkedIdSetAtomPrivate = atom<Set<number>>({ key: "checkedIdListAtom", default: new Set() });

export const checkedIdSetSelector = selector<Set<number>>({
  key: "checkedIdSetSelector",
  get: ({ get }) => {
    const checkedIdSet = get(checkedIdSetAtomPrivate);
    const cartIdSet = get(cartIdSetSelector);
    return filterIn(checkedIdSet, cartIdSet);
  },
  set: ({ get, set }, newValue) => {
    if (newValue instanceof DefaultValue) return;
    const cartIdSet = get(cartIdSetSelector);
    set(checkedIdSetAtomPrivate, filterIn(newValue, cartIdSet));
  },
});

export const isCheckedSelectorFamily = selectorFamily<boolean, number>({
  key: "isCheckedSelectorFamily",
  get:
    (id: number) =>
    ({ get }) =>
      get(checkedIdSetSelector).has(id),
  set:
    (id: number) =>
    ({ get, set }, newValue) => {
      const checkedIdSet = get(checkedIdSetSelector);

      if (newValue instanceof DefaultValue || !newValue) {
        checkedIdSet.delete(id);
        set(checkedIdSetSelector, checkedIdSet);
        return;
      }
      console.log(checkedIdSet, newValue);
      checkedIdSet.add(id);
      console.log(checkedIdSet);
      set(checkedIdSetSelector, checkedIdSet);
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
    set(checkedIdSetAtomPrivate, new Set());
  },
});
