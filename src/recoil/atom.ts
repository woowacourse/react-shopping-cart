import { atom, selector } from "recoil";
import { ProductListType } from "../types/domain";
import { fetchProducts } from "../api";
import { getNewProducts } from "../utils/domain";

export const initialProductsState = atom<ProductListType>({
  key: "initialProducts",
  default: selector<ProductListType>({
    key: "initialProducts/default",
    get: async () => {
      const data = await fetchProducts();
      return data;
    },
  }),
});

export const productsState = atom<ProductListType>({
  key: "products",
  default: selector<ProductListType>({
    key: "products/default",
    get: async ({ get }) => {
      return await getNewProducts(get(initialProductsState));
    },
  }),
});

export const selectedProductsState = atom<ProductListType>({
  key: "selectedProducts",
  default: [],
});
