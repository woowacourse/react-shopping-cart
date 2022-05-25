import productActionType from "redux/products/products.types";
import { Product } from "type";

export const fetchProductsStart = (id: number) => ({
  type: productActionType.fetchProductsStart,
  payload: id,
});

export const fetchProductsSuccess = (products: Product[]) => ({
  type: productActionType.fetchProductsSuccess,
  payload: products,
});

export const fetchProductsError = (error: Error) => ({
  type: productActionType.fetchProductsError,
  payload: error,
});

export const fetchProductDetailStart = (id: number) => ({
  type: productActionType.fetchProductDetailStart,
  payload: id,
});

export const fetchProductDetailSucccess = (product: Product) => ({
  type: productActionType.fetchProductDetailSuccess,
  payload: product,
});

export const fetchProductDetailError = (err: Error) => ({
  type: productActionType.fetchProductDetailError,
  payload: err,
});

export type ProductAction =
  | ReturnType<typeof fetchProductsStart>
  | ReturnType<typeof fetchProductsSuccess>
  | ReturnType<typeof fetchProductsError>
  | ReturnType<typeof fetchProductDetailStart>
  | ReturnType<typeof fetchProductDetailSucccess>
  | ReturnType<typeof fetchProductDetailError>;
