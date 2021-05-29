import { productsReducer } from './reducer';
import { ProductsState } from './type';
import { GET_PRODUCTS_FAILURE, GET_PRODUCTS_REQUEST, GET_PRODUCTS_SUCCESS } from './actions';

import { mockProductsResponse } from '../../mockData/mockData';
import { praseProductDataList } from '../../utils/parseData';

describe('products reducer', () => {
  it('products/GET_PRODUCTS', () => {
    const requestState = productsReducer(undefined, { type: GET_PRODUCTS_REQUEST });
    expect(requestState).toEqual<ProductsState>({
      loading: true,
      error: null,
      products: [],
    });

    const successState = productsReducer(requestState, {
      type: GET_PRODUCTS_SUCCESS,
      payload: praseProductDataList(mockProductsResponse.data),
    });
    expect(successState).toEqual<ProductsState>({
      loading: false,
      error: null,
      products: praseProductDataList(mockProductsResponse.data),
    });

    const error = new Error('test error');

    const failureState = productsReducer(requestState, {
      type: GET_PRODUCTS_FAILURE,
      error: error,
    });

    expect(failureState).toEqual<ProductsState>({
      loading: false,
      error: error,
      products: [],
    });
  });
});
