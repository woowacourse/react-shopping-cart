import { selector } from "recoil";
import { PayloadType, ProductListType, ProductType } from "../types/domain";
import { initialProductsState, productsState } from "./atom";
import { MIN_QUANTITY } from "../constants";
import { fetchProducts } from "../api";
import { getNewProducts } from "../utils/domain";

export const cartProductsSelector = selector<ProductListType>({
  key: "cartProducts",
  get: ({ get }) => {
    return get(productsState).filter(
      (product: ProductType) => product.quantity !== MIN_QUANTITY
    );
  },
});

export const newProductsSelector = selector<any>({
  key: "newProducts",
  get: async ({ get }) => {
    return await getNewProducts(get(initialProductsState));
  },
  set: ({ set }, newProducts) => {
    return set(productsState, newProducts);
  },
});
