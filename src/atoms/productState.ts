import { selector } from "recoil";
import { getProductsData } from "../api/products";

export const productData = selector({
  key: "productData",
  get: async () => {
    return getProductsData();
  },
});
