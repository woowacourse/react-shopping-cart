import { selector } from "recoil";
import { ProductType } from "../types/domain";
import { productsState } from "./atom";
import { MIN_QUANTITY } from "../constants";

export const cartProductsSelector = selector({
  key: "cartProducts",
  get: ({ get }) => {
    return get(productsState).filter(
      (Product: ProductType) => Product.quantity !== MIN_QUANTITY.toString()
    );
  },
  set: ({ get, set }, newProduct) => {
    const products = get(productsState);
    const newProducts = products.map((Product: ProductType) =>
      Product.id === newProduct.id
        ? { ...Product, quantity: newProduct.quantity.toString() }
        : Product
    );
    return set(productsState, newProducts);
  },
});
