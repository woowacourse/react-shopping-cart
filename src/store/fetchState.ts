import { atom, selector } from "recoil";
import { Cart, Product } from "../types/product";

export const fetchedProductListAtom = atom<Product[]>({
  key: "fetchedProductList",
  default: [],
});

export const fetchedShoppingListAtom = atom<Cart[]>({
  key: "fetchedShoppingList",
  default: [],
});

export const targetShoppingSelector = selector({
  key: "targetShopping",
  get:
    ({ get }) =>
    (id: number) => {
      return get(fetchedShoppingListAtom).find(
        (shoppingProduct) => shoppingProduct.id === id
      ) as Cart;
    },
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
