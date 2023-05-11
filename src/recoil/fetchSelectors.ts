import { selector } from "recoil";
import fetchProductList from "../api/productList";
import { Product } from "../types/product";

export const fetchedProductListSelector = selector({
  key: "fetchedProductList",
  get: async () => {
    const data = await fetchProductList<Product[]>();
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
