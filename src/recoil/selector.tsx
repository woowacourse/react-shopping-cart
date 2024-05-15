import { selector, selectorFamily } from "recoil";
import { cartItemCheckedAtomFamily, cartItemCheckedIdsAtom } from "./atom";
import { fetchCartItems } from "../api/cartItem";

// selector({ key: "card-items-count", get: });
// selector({
//   key: "cartItemsAllCheckedState",
//   get: ({ get }) => {
//     const cartItems = get(cartItemCheckedState);
//     return cartItems.every((item) => get(cartItemCheckedState(item.id)));
//   },
// });

export const cartItemCheckedIdsSelectorFamily = selectorFamily({
  key: "cartItemCheckedIdsSelectorFamily",
  get:
    (id: number) =>
    ({ get }) =>
      get(cartItemCheckedAtomFamily(id)),
  set:
    (id: number) =>
    ({ set }, newValue) => {
      set(cartItemCheckedAtomFamily(id), newValue);
      set(cartItemCheckedIdsAtom, (prev) => [...prev, id]);
    },
});

export const cartItemQuantitySelector = selectorFamily<number, number>({
  key: "cartItemQuantitySelector",
  get: (productId: number) => async () => {
    const cartItems = await fetchCartItems();
    const item = cartItems.find((item) => item.id === productId);
    return item ? item.quantity : 0;
  },
  set:
    (productId: number) =>
    ({ set }, newValue) => {
      set(cartItemQuantitySelector(productId), newValue);
    },
});
