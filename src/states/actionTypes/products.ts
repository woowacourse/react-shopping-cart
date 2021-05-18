import { AxiosError } from 'axios';

export interface ProductsRequestAction {
  type: typeof REQUEST;
}

export interface ProductsSuccessAction {
  type: typeof REQUEST_SUCCESS;
  payload: Product[] | any;
}

export interface ProductsFailureAction {
  type: typeof REQUEST_FAILURE;
  error: AxiosError;
}

export type ProductsAction = ProductsRequestAction | ProductsSuccessAction | ProductsFailureAction;

export const REQUEST = 'products/REQUEST';
export const REQUEST_SUCCESS = 'products/REQUEST_SUCCESS';
export const REQUEST_FAILURE = 'products/REQUEST_FAILURE';
