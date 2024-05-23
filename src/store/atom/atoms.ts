import { atomFamily, atom, selector } from "recoil";
import { ITEM_CHECKING_STATE_KEY } from "../../constants";
import { getStorage, setStorage } from "../localStorage/localStorage";
import { fetchCartState } from "../selector/fetchCartState";
import { fetchCouponsState } from "../selector/fetchCouponsState";

export const cartState = atom({
  key: "cartState",
  default: fetchCartState,
});

export const cartItemCheckedState = atomFamily<boolean, number>({
  key: "cartItemCheckedState",
  default: true,
  effects: (id) => [
    ({ setSelf, onSet }) => {
      const localData = getStorage<CartItemCheckedStateInStorage>(ITEM_CHECKING_STATE_KEY, {});
      if (localData[id] !== undefined) {
        setSelf(localData[id]);
      }

      onSet((newValue) => {
        const localData = getStorage<CartItemCheckedStateInStorage>(ITEM_CHECKING_STATE_KEY, {});
        localData[id] = newValue;
        setStorage(ITEM_CHECKING_STATE_KEY, localData);
      });
    },
  ],
});

export const cartItemIdListState = atom<number[]>({
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

export const couponsState = atom<Coupon[]>({
  key: "couponsState",
  default: fetchCouponsState,
});

export const selectedCouponsState = atom<Coupon[]>({
  key: "selectedCoupons",
  default: [],
});
