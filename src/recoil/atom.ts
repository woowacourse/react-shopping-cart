import { atom } from "recoil";
import { ProductListType } from "../types/domain";

export const productsState = atom<ProductListType>({
  key: "products",
  default: [],
});
