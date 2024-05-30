import { atomFamily, selector } from "recoil";
import { cartItemsState } from "./cartItems";
import getPersistenceConfig from "./utils/getPersistenceConfig";
import { CartItem } from "@/types/cartItem";

export const cartItemSelectionsState = atomFamily<boolean, number>({
  key: "cartItemSelectionsState",
  default: false,
  effects: [getPersistenceConfig("cartItemSelections").persistAtom],
});

export const isAllCartItemSelectedState = selector({
  key: "isAllCartItemSelectedState",
  get: ({ get }) => {
    const cartItems = get(cartItemsState);
    return cartItems.every(({ id }) => get(cartItemSelectionsState(id)));
  },
  set: ({ get, set }, newValue) => {
    const cartItems = get(cartItemsState);
    cartItems.forEach(({ id }) => {
      set(cartItemSelectionsState(id), newValue);
    });
  },
});

export const isAnyCartItemSelectedState = selector({
  key: "isAnyCartItemSelectedState",
  get: ({ get }) => {
    const cartItems = get(cartItemsState);
    return cartItems.some(({ id }) => get(cartItemSelectionsState(id)));
  },
});

export const selectedCartItemsState = selector<CartItem[]>({
  key: "selectedCartItemsState",
  get: ({ get }) => {
    const cartItems = get(cartItemsState);
    const selectedCartItems = cartItems.filter((item) => {
      const isSelected = get(cartItemSelectionsState(item.id));
      return isSelected;
    });
    return selectedCartItems;
  },
});
