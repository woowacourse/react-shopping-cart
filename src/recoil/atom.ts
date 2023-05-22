import { atom, selector, useRecoilValue } from "recoil";
import { ProductListType, PayloadType } from "../types/domain";
import { fetchProducts } from "../api";
import { getNewProducts } from "../utils/domain";
import { waitFor } from "@testing-library/react";

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
      console.log("** ", get(initialProductsState));
      const test = get(initialProductsState);
      console.log("0000 ", await getNewProducts(test));
      return await getNewProducts(test);
    },
  }),
});

export const selectedProductsState = atom<ProductListType>({
  key: "selectedProducts",
  default: [],
});
