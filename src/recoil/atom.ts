import { atom } from "recoil";
import { ProductListType, PayloadType } from "../types/domain";

export const initialProductsState = atom<PayloadType[]>({
  key: "initialProducts",
  default: [],
});

export const productsState = atom<ProductListType>({
  key: "products",
  default: [],
});

export const selectedProductsState = atom<ProductListType>({
  key: "selectedProducts",
  default: [],
});
