import { product } from "../../types/product";

export enum ProductsListActionType {
  GET_PRODUCTS = "products/GET_PRODUCTS",
  GET_PRODUCTS_SUCCESS = "products/GET_PRODUCTS_SUCCESS",
  GET_PRODUCTS_ERROR = "products/GET_PRODUCTS_ERROR",
  GET_PRODUCTS_END = "products/GET_PRODUCTS_END",
}

export interface Products {
  isLoading: boolean;
  data: product[];
  error: null | string;
  isEnd: boolean;
  page: number;
}

interface GetProductListAction {
  type: ProductsListActionType.GET_PRODUCTS;
}

interface GetProductListActionSuccess {
  type: ProductsListActionType.GET_PRODUCTS_SUCCESS;
  products: product[];
}

interface GetProductListActionError {
  type: ProductsListActionType.GET_PRODUCTS_ERROR;
  error: string;
}

interface GetProductListActionPageEnd {
  type: ProductsListActionType.GET_PRODUCTS_END;
  products: product[];
}

export type ProductListAction =
  | GetProductListAction
  | GetProductListActionSuccess
  | GetProductListActionError
  | GetProductListActionPageEnd;
