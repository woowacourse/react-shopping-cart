import { atom } from "recoil";
import { KEY_LOCALSTORAGE_CART, MIN_QUANTITY } from "../constants";
import mockData from "../mockData.json";
import { ProductType } from "../types/domain";
import { getLocalStorage } from "../utils";

const cartProducts = getLocalStorage<ProductType[]>(KEY_LOCALSTORAGE_CART, []);

export const productsState = atom({
  key: "products",
  default: structuredClone(mockData).map((Product: ProductType) => {
    const targetProduct = cartProducts.find(
      (cartProduct) => cartProduct.id === Product.id
    );
    return {
      ...Product,
      quantity: targetProduct
        ? targetProduct.quantity
        : MIN_QUANTITY.toString(),
    };
  }),
});
