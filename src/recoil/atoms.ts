import { AtomEffect, atom, atomFamily, selector, selectorFamily } from "recoil";
import { fetchCartItems, fetchCoupons } from "../api";
import CartItemLocalStorage from "../services/CartItemLocalStorage";
import { CartItemType, Coupon } from "../types";
import { initializeCartItemStorage } from "./selectors";

export const cartListState = atom<CartItemType[]>({
  key: "cartListState",
  default: selector<CartItemType[]>({
    key: "cartListSelector",
    get: async () => {
      try {
        const items = await fetchCartItems();
        initializeCartItemStorage(items);
        return items;
      } catch (error) {
        console.error("Failed to fetch cart items : ", error);
        return [];
      }
    },
  }),
});

export const cartItemQuantity = atomFamily<number, number>({
  key: "cartItemQuantity",
  default: selectorFamily({
    key: "initialCartItemQuantity",
    get:
      (id) =>
      ({ get }) => {
        const cartList = get(cartListState);
        const item = cartList.find((item) => item.id === id);
        return item ? item.quantity : 0;
      },
  }),
});

export const cartItemSelected = atomFamily<boolean, number>({
  key: "cartItemSelected",
  default: (id: number) => {
    const storageState = CartItemLocalStorage.get("cartItemSelected");

    if (storageState) {
      return storageState[id];
    }
    return false;
  },
  effects: (id: number): AtomEffect<boolean>[] => [
    ({ onSet }) => {
      onSet((newValue) => {
        const storageState = CartItemLocalStorage.get("cartItemSelected");

        if (storageState) {
          storageState[id] = newValue;
          CartItemLocalStorage.set("cartItemSelected", storageState);
        }
      });
    },
  ],
});

export const couponsState = atom<Coupon[]>({
  key: "couponState",
  default: selector<Coupon[]>({
    key: "couponsSelector",
    get: async () => {
      try {
        const items = await fetchCoupons();

        return items;
      } catch (error) {
        console.error("Failed to fetch coupons : ", error);
        return [];
      }
    },
  }),
});

export const couponSelectedState = atomFamily<boolean, number>({
  key: "couponSelectedState",
  default: false,
});
