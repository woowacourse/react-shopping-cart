import { selector } from "recoil";
import { getProductsData } from "../api/products";

export const productData = selector({
  key: "productData",
  get: async () => {
    const data = await getProductsData();
    return data;
  },
});
