import { atomFamily, atom, selector } from "recoil";
import { LOCAL_STORAGE_KEY } from "../../constants";
import { fetchProducts } from "../api";
import { getStorage, setStorage } from "../localStorage/localStorage";

export const fetchCartState = selector({
  key: "fetchCartState",
  get: async () => {
    const { content }: { content: CartItemInfo[] } = await fetchProducts("GET");
    const localData = getStorage<CartItemCheckedStateInStorage>(LOCAL_STORAGE_KEY, {});
    content.forEach((cartItem) => {
      if (localData[cartItem.id] === undefined) localData[cartItem.id] = true;
    });
    setStorage(LOCAL_STORAGE_KEY, localData);
    return content;
  },
});

export const cartState = atom({
  key: "cartState",
  default: fetchCartState,
});

export const CartItemCheckedState = atomFamily<boolean, number>({
  key: "cartItemCheckedState",
  default: true,
  effects: (id) => [
    ({ setSelf, onSet }) => {
      const localData = getStorage<CartItemCheckedStateInStorage>(LOCAL_STORAGE_KEY, {});
      if (localData[id]) {
        setSelf(localData[id]);
      }

      onSet((newValue) => {
        const localData = getStorage<CartItemCheckedStateInStorage>(LOCAL_STORAGE_KEY, {});
        localData[id] = newValue;
        setStorage(LOCAL_STORAGE_KEY, localData);
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
