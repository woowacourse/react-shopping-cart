import { AxiosError } from 'axios';

export interface ProductsRequestAction {
  type: typeof LOADING;
}

export interface ProductsSuccessAction {
  type: typeof LOADING_SUCCESS;
  payload: Product[] | any;
}

export interface ProductsFailureAction {
  type: typeof LOADING_FAILURE;
  loadingError: AxiosError;
}

export type ProductsAction = ProductsRequestAction | ProductsSuccessAction | ProductsFailureAction;

export const LOADING = 'products/LOADING';
export const LOADING_SUCCESS = 'products/LOADING_SUCCESS';
export const LOADING_FAILURE = 'products/LOADING_FAILURE';
