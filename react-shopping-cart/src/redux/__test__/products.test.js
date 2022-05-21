import mockData from '../../mocks/mockData.json';

import {
  fetchProductDetailStart,
  fetchProductDetailSuccess,
  fetchProductsStart,
  fetchProductsSuccess,
} from 'redux/products/products.action';
import productsReducer from 'redux/products/products.reducer';

import { FETCH_PRODUCTS_LIMIT } from 'constants/index';

describe('product reducer 테스트', () => {
  test('상품 목록 받아오기', () => {
    const page = 1;
    const INITIAL_STATE = {
      loading: false,
      products: [],
      detailProduct: null,
      error: null,
    };

    expect(productsReducer(INITIAL_STATE, fetchProductsStart(page))).toEqual({
      loading: true,
      products: [],
      detailProduct: null,
      error: null,
    });

    const products = mockData.products.slice(
      (page - 1) * FETCH_PRODUCTS_LIMIT,
      page * FETCH_PRODUCTS_LIMIT
    );

    expect(
      productsReducer(INITIAL_STATE, fetchProductsSuccess(products))
    ).toEqual({
      loading: false,
      products: products,
      detailProduct: null,
      error: null,
    });
  });

  test('상품 받아오기', () => {
    const INITIAL_STATE = {
      loading: false,
      products: [],
      detailProduct: null,
      error: null,
    };
    const id = 1;

    expect(productsReducer(INITIAL_STATE, fetchProductDetailStart(id))).toEqual(
      {
        loading: true,
        products: [],
        detailProduct: null,
        error: null,
      }
    );

    const product = mockData.products.find((product) => product.id === id);

    expect(
      productsReducer(INITIAL_STATE, fetchProductDetailSuccess(product))
    ).toEqual({
      loading: false,
      products: [],
      detailProduct: product,
      error: null,
    });
  });
});
