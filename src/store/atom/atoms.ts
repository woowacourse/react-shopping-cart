import { atomFamily, atom, selector } from "recoil";
import { fetchCartState } from "../selector/selectors";
import { LOCAL_STORAGE_KEY } from "../../constants";

export const cartState = atom({
  key: "cartState",
  default: fetchCartState,
});

export const itemEachCheckState = atomFamily<boolean, number>({
  key: "itemEachCheckState",
  default: true,
  effects: (id) => [
    ({ setSelf, onSet }) => {
      const localData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) ?? "{}");
      if (localData[id]) {
        setSelf(localData[id]);
      }

      onSet((newValue) => {
        const localData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) ?? "{}");
        localData[id] = newValue;
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(localData));
      });
    },
  ],
});

export const itemIdsState = atom<number[]>({
  key: "itemIdsState",
  default: selector({
    key: "itemIdsList",
    get: ({ get }) => {
      return get(cartState).map((item: CartItemInfo) => item.id);
    },
  }),
});

export const itemQuantityState = atom<Record<number, number>>({
  key: "itemQuantityState",
  default: selector({
    key: "itemQuantityObject",
    get: ({ get }) => {
      const obj: Record<number, number> = {};
      get(cartState).forEach((cartItem: CartItemInfo) => {
        obj[cartItem.id] = cartItem.quantity;
      });
      return obj;
    },
  }),
});
