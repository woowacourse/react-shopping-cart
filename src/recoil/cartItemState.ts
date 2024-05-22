import { atom, atomFamily, selector } from "recoil";
import { fetchCartItems } from "../api/cartItem";
import { checkedIdSetSelector } from "./checkedState";
import { CartItem } from "../types";

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

export const quantityAtomFamily = atomFamily<number, number>({ key: "quantityAtomFamily", default: null });
