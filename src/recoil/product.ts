import { atom, selector, selectorFamily } from "recoil";
import { Product } from "types/domain";
import { getProducts } from "api/products";

const getProductList = selector<Product[]>({
  key: "getProductList",
  get: async () => {
    const products = await getProducts();

    return products;
  },
});

export const productListState = atom<Product[]>({
  key: "productList",
  default: getProductList,
});

export const productSelector = selectorFamily<Product, number>({
  key: "productSelector",
  get:
    (id) =>
    ({ get }) =>
      get(productListState).find((product) => product.id === id)!,
});
