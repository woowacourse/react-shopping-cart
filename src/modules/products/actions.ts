import { Dispatch } from 'redux';
import { AxiosError } from 'axios';
import api from '../../api';
import * as T from '../../types';

export const GET_PRODUCTS_REQUEST = 'products/GET_PRODUCTS_REQUEST' as const;
export const GET_PRODUCTS_SUCCESS = 'products/GET_PRODUCTS_SUCCESS' as const;
export const GET_PRODUCTS_FAILURE = 'products/GET_PRODUCTS_FAILURE' as const;

interface ProductsRequestAction {
  type: typeof GET_PRODUCTS_REQUEST;
}

interface ProductsSuccessAction {
  type: typeof GET_PRODUCTS_SUCCESS;
  products: T.Product[];
}

interface ProductsFailureAction {
  type: typeof GET_PRODUCTS_FAILURE;
  error: AxiosError;
}

export type ProductsAction = ProductsRequestAction | ProductsSuccessAction | ProductsFailureAction;

export const getProductsRequest = () => async (dispatch: Dispatch<ProductsAction>) => {
  dispatch({ type: GET_PRODUCTS_REQUEST });

  try {
    const response = await api.get('/products');
    const products = response.data;

    dispatch({ type: GET_PRODUCTS_SUCCESS, products });
  } catch (error) {
    dispatch({ type: GET_PRODUCTS_FAILURE, error });
  }
};
