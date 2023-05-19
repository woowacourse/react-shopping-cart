import { selector } from "recoil";
import fetchProductList from "../api";
import { Product } from "../types/product";

export const fetchedProductListSelector = selector({
  key: "fetchedProductList",
  get: async () => {
    const data = await fetchProductList<Product[]>("/products");

    return data;
  },
});

export const targetProductSelector = selector({
  key: "targetProduct",
  get:
    ({ get }) =>
    (id: number) => {
      return get(fetchedProductListSelector).find(
        (product) => product.id === id
      ) as Product;
    },
});
