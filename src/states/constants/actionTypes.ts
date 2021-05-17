import { AxiosError } from 'axios';

export const GET_PRODUCTS_REQUEST = 'products/GET_PRODUCT_REQUEST';
export const GET_PRODUCTS_SUCCESS = 'products/GET_PRODUCT_SUCCESS';
export const GET_PRODUCTS_FAILURE = 'products/GET_PRODUCT_FAILURE';

export interface ProductsRequestAction {
  type: typeof GET_PRODUCTS_REQUEST;
}

export interface ProductSuccessAction {
  type: typeof GET_PRODUCTS_SUCCESS;
  payload: Product[];
}

export interface ProductFailureAction {
  type: typeof GET_PRODUCTS_FAILURE;
  error: AxiosError;
}

export type ProductsAction = ProductsRequestAction | ProductSuccessAction | ProductFailureAction;
