import { ProductType } from "../../types/product";

export enum ProductActionType {
  GET_PRODUCT = "product/GET_PRODUCT",
  GET_PRODUCT_SUCCESS = "product/GET_PRODUCT_SUCCESS",
  GET_PRODUCT_ERROR = "product/GET_PRODUCT_ERROR",
}

export interface Product {
  isLoading: boolean;
  data: ProductType;
  error: null | string;
}

interface GetProductAction {
  type: ProductActionType.GET_PRODUCT;
}

interface GetProductActionSuccess {
  type: ProductActionType.GET_PRODUCT_SUCCESS;
  product: ProductType;
}

interface GetProductActionError {
  type: ProductActionType.GET_PRODUCT_ERROR;
  error: string;
}

export type ProductAction =
  | GetProductAction
  | GetProductActionSuccess
  | GetProductActionError;
