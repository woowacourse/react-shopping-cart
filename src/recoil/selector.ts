import { selector } from "recoil";
import { ProductListType, ProductType } from "../types/domain";
import { productsState } from "./atom";
import { MIN_QUANTITY } from "../constants";

export const cartProductsSelector = selector<ProductListType>({
  key: "cartProducts",
  get: ({ get }) => {
    return get(productsState).filter(
      (product: ProductType) => product.quantity !== MIN_QUANTITY
    );
  },
});
