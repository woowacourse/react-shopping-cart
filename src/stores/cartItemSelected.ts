import { atomFamily, selector } from "recoil";
import { cartItemsState } from "./cartItems";
import getPersistenceConfig from "./utils/getPersistenceConfig";

export const isCartItemsSelectedState = atomFamily({
  key: "isCartItemsSelectedState",
  default: false,
  effects_UNSTABLE: [getPersistenceConfig("cartItemSelections").persistAtom],
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
