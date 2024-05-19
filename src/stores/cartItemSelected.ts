import { atomFamily, selector } from "recoil";
import persistAtom from "./utils/persist";
import { cartItemsState } from "./cartItems";

export const isCartItemsSelectedState = atomFamily({
  key: "isCartItemsSelectedState",
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export const isAllCartItemSelectedState = selector({
  key: "isAllCartItemSelectedState",
  get: ({ get }) => {
    const cartItems = get(cartItemsState);
    return cartItems.every(({ id }) => get(isCartItemsSelectedState(id)));
  },
  set: ({ get, set }, newValue) => {
    const cartItems = get(cartItemsState);
    cartItems.forEach(({ id }) => {
      set(isCartItemsSelectedState(id), newValue);
    });
  },
});

export const isAnyCartItemSelectedState = selector({
  key: "isAnyCartItemSelectedState",
  get: ({ get }) => {
    const cartItems = get(cartItemsState);
    return cartItems.some(({ id }) => get(isCartItemsSelectedState(id)));
  },
});
