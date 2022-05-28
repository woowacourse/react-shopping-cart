import productList, { ProductListState } from 'store/productList/reducer';
import cartProductList, { CartProductListState } from 'store/cartProductList/reducer';
import { GET_PRODUCT_LIST_SUCCESS } from 'store/productList/actionTypes';
import { GET_CART_PRODUCT_LIST_SUCCESS } from 'store/cartProductList/actionTypes';

import { productList as mockProductList } from 'mocks/data';
import { cartProductList as mockCartProductList } from 'mocks/data';

describe('리듀서 테스트', () => {
  test('상품 불러오기 액션이 성공적으로 들어올 시, 상태에 상품 리스트를 추가해야 한다.', () => {
    const initialState: ProductListState = {
      productList: [],
      isLoading: false,
      isError: false,
    };

    const getProductListSuccessAction = {
      type: GET_PRODUCT_LIST_SUCCESS,
      payload: { productList: mockProductList },
    };

    expect(productList(initialState, getProductListSuccessAction)).toEqual({
      ...initialState,
      productList: mockProductList,
    });
  });

  test('카드 상품 불러오기 액션이 성공적으로 들어올 시, 상태에 카트 상품 리스트를 추가해야 한다.', () => {
    const initialState: CartProductListState = {
      cartProductList: [],
      isLoading: false,
      isError: false,
    };

    const getCartProductListSuccessAction = {
      type: GET_CART_PRODUCT_LIST_SUCCESS,
      payload: { cartProductList: mockCartProductList },
    };

    expect(cartProductList(initialState, getCartProductListSuccessAction)).toEqual({
      ...initialState,
      cartProductList: mockCartProductList,
    });
  });
});
