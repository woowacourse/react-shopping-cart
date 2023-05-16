import { atom } from "recoil";
import { KEY_LOCALSTORAGE_CART, MIN_QUANTITY } from "../constants";
import mockData from "../mockData.json";
import { ProductListType, ProductType } from "../types/domain";
import { getLocalStorage } from "../utils";

const cartProducts = getLocalStorage<ProductListType>(
  KEY_LOCALSTORAGE_CART,
  []
);

export const productsState = atom({
  key: "products",
  default: structuredClone(mockData).map((product: ProductType) => {
    const targetProduct = cartProducts.find(
      (cartProduct) => cartProduct.id === product.id
    );
    return {
      ...product,
      quantity: targetProduct
        ? targetProduct.quantity
        : MIN_QUANTITY.toString(),
    };
  }),
});
