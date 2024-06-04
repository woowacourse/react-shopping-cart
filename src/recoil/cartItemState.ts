import { atom, selector, selectorFamily } from "recoil";
import { fetchCartItems } from "../api/cartItem";
import { checkedIdSetSelector } from "./checkedState";
import { CartItem } from "../types/types";

export const fetchCartItemsSelector = selector({ key: "fetchCartItemsSelector", get: fetchCartItems });
export const cartItemListAtom = atom({ key: "cartItemListAtom", default: fetchCartItemsSelector });

export const cartItemSelectedSelector = selector<CartItem[]>({
  key: "cartItemSelected",
  get: ({ get }) => {
    const checkedIdSet = get(checkedIdSetSelector);
    return get(cartItemListAtom).filter((item) => checkedIdSet.has(item.id));
  },
});

export const cartIdSetSelector = selector<Set<number>>({
  key: "cartIdSetSelector",
  get: ({ get }) => new Set(get(cartItemListAtom).map((item) => item.id)),
});

export const quantitySelectorFamily = selectorFamily<number, number>({
  key: "quantityAtomFamily",
  get:
    (id: number) =>
    ({ get }) =>
      get(cartItemListAtom).find((item) => item.id === id).quantity,
  set:
    (id: number) =>
    ({ get, set }, newQuantity) => {
      const cartItemList = get(cartItemListAtom);
      const result = cartItemList.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item));
      set(cartItemListAtom, result);
    },
});

export const isVacantCartSelector = selector<boolean>({
  key: "isVacantCartSelector",
  get: ({ get }) => get(cartItemListAtom).length === 0,
});
