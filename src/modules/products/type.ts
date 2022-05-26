import { ProductType } from "../../types/product";

export const enum ProductsListActionType {
  GET_PRODUCTS = "products/GET_PRODUCTS",
  GET_PRODUCTS_SUCCESS = "products/GET_PRODUCTS_SUCCESS",
  GET_PRODUCTS_ERROR = "products/GET_PRODUCTS_ERROR",
  GET_PRODUCTS_END = "products/GET_PRODUCTS_END",
}

export interface Products {
  isLoading: boolean;
  data: ProductType[];
  error: null | string;
  isEnd: boolean;
  page: number;
}

interface GetProductListAction {
  type: ProductsListActionType.GET_PRODUCTS;
}

interface GetProductListActionSuccess {
  type: ProductsListActionType.GET_PRODUCTS_SUCCESS;
  products: ProductType[];
}

interface GetProductListActionError {
  type: ProductsListActionType.GET_PRODUCTS_ERROR;
  error: string;
}

interface GetProductListActionPageEnd {
  type: ProductsListActionType.GET_PRODUCTS_END;
  products: ProductType[];
}

export type ProductListAction =
  | GetProductListAction
  | GetProductListActionSuccess
  | GetProductListActionError
  | GetProductListActionPageEnd;
