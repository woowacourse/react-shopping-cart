import { selector } from "recoil";
import { Product } from "../types/domain";
import { productListState } from "./atom";
import { MIN_QUANTITY } from "../constants";

export const cartItemSelector = selector({
  key: "cartItem",
  get: ({ get }) => {
    return get(productListState).filter(
      (item: Product) => item.quantity !== MIN_QUANTITY.toString()
    );
  },
  set: ({ get, set }, newItem) => {
    const items = get(productListState);
    const newItems = items.map((item: Product) =>
      item.id === newItem.id ? { ...item, quantity: newItem.quantity.toString() } : item
    );

    return set(productListState, newItems);
  },
});
