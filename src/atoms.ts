import { atom, atomFamily, selector } from "recoil";
import { CartItem } from "./types/Cart";
import { fetchCartItem, fetchProducts } from "./utils/apis";
import { Id, Product } from "./types/Product";

const cartListQuerySelector = selector({
  key: "cartListQuerySelector",
  get: async ({ get }) => {
    const data = await fetchCartItem();

    return data;
  },
});

export const cartListState = atom<CartItem[]>({
  key: "cartListState",
  default: cartListQuerySelector,
});

const productsQuerySelector = selector({
  key: "productsQuerySelector",
  get: async ({ get }) => {
    const data = await fetchProducts();

    return data;
  },
});

export const productsState = atom<Product[]>({
  key: "productsState",
  default: productsQuerySelector,
});
