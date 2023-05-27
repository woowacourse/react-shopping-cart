import { atom, selector } from "recoil";
import { Product } from "../types/product";

export const fetchedProductListAtom = atom<Product[]>({
  key: "fetchedProductList",
  default: [],
});

export const targetProductSelector = selector({
  key: "targetProduct",
  get:
    ({ get }) =>
    (id: number) => {
      return get(fetchedProductListAtom).find(
        (product) => product.id === id
      ) as Product;
    },
});
