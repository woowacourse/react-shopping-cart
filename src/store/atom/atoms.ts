import { atomFamily, atom, selector } from "recoil";
import { cartState } from "../selector/selectors";

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

export const itemQuantityState = atomFamily<number, number>({
  key: "itemQuantityState",
  default: 0,
});
