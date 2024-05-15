import { atom, selector, selectorFamily } from "recoil";
import { cartItemCheckedIdsAtom, cartItemsAtom } from "./atom";

export const orderPriceSelector = selector({
  key: "orderPriceSelector",
  get: ({ get }) => {
    const cartItems = get(cartItemsAtom);
    const checkedIds = get(cartItemCheckedIdsAtom);
    return cartItems.reduce((acc, item) => {
      if (checkedIds.includes(item.id)) {
        return acc + item.product.price * item.quantity;
      }
      return acc;
    }, 0);
  },
});

export const quantityAtom = selector({
  key: "cartItemQuantity",
  get: ({ get }) => {
    const cartItems = get(cartItemsAtom);
    return Object.fromEntries(cartItems.map((item) => [item.id, item.quantity]));
  },
});
