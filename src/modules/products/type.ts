import { AxiosError } from 'axios';
import { Product } from '../../type';
import { GET_PRODUCTS_FAILURE, GET_PRODUCTS_REQUEST, GET_PRODUCTS_SUCCESS } from './actions';

export interface ProductsRequestAction {
  type: typeof GET_PRODUCTS_REQUEST;
}

export interface ProductsSuccessAction {
  type: typeof GET_PRODUCTS_SUCCESS;
  payload: Product[];
}

export interface ProductsFailureAction {
  type: typeof GET_PRODUCTS_FAILURE;
  error: AxiosError | Error;
}

export type ProductsAction = ProductsRequestAction | ProductsSuccessAction | ProductsFailureAction;

export interface ProductsState {
  loading: boolean;
  error: AxiosError | Error | null;
  products: Product[];
}
