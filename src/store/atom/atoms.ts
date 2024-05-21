import { atomFamily, atom, selector } from "recoil";
import { LOCAL_STORAGE_KEY } from "@/constants";
import { fetchCoupons, fetchProducts } from "@/api";
import { setCartItemsLocalStorage } from "../localStorage/localStorage";

export const cartState = atom<CartItemInfo[]>({
  key: "cartState",
  default: selector({
    key: "fetchCartState",
    get: async () => {
      const { content: cartItems }: { content: CartItemInfo[] } = await fetchProducts();
      setCartItemsLocalStorage(cartItems);
      return cartItems;
    },
  }),
});

export const checkAllItemState = selector({
  key: "checkAllItemState",
  get: ({ get }) => {
    const itemIds = get(cartState).map((item: CartItemInfo) => item.id);
    return itemIds.every((itemId) => get(itemEachCheckState(itemId)));
  },
  set: ({ set, get }, newValue) => {
    const itemIds = get(cartState).map((item: CartItemInfo) => item.id);
    itemIds.forEach((itemId) => set(itemEachCheckState(itemId), newValue));
  },
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

export const couponsState = atom({
  key: "couponsState",
  default: selector({
    key: "fetchCoupons",
    get: async () => {
      const coupons = await fetchCoupons();
      return coupons;
    },
  }),
});
