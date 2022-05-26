import productReducer, { initState } from 'reducers/productReducer';

import { productList } from 'mocks/mockData';

import {
  PRODUCT_INITIALIZE,
  PRODUCT_INITIALIZE_SUCCESS,
  PRODUCT_INITIALIZE_ERROR,
} from 'actions/action';

const error = 'error';

describe('productReducer', () => {
  test('productList를 불러올 수 있다. (request)', () => {
    expect(productReducer(initState, { type: PRODUCT_INITIALIZE })).toEqual({
      ...initState,
      products: {
        productListLoading: true,
        productList: [],
        productListError: null,
      },
    });
  });

  test('productList를 불러올 수 있다. (success)', () => {
    expect(productReducer(initState, { type: PRODUCT_INITIALIZE_SUCCESS, productList })).toEqual({
      ...initState,
      products: {
        productListLoading: false,
        productList: productList.data,
        productListError: null,
      },
    });
  });

  test('productList를 불러올 수 있다. (error)', () => {
    expect(productReducer(initState, { type: PRODUCT_INITIALIZE_ERROR, error })).toEqual({
      ...initState,
      products: {
        productListLoading: false,
        productList: [],
        productListError: error,
      },
    });
  });
});
