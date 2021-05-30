import { cartReducer } from './reducer';
import { CartState } from './type';
import { GET_CART_ITEMS_FAILURE, GET_CART_ITEMS_REQUEST, GET_CART_ITEMS_SUCCESS } from './actions';

import { mockCartResponse } from '../../mockData/mockData';
import { parseCartItemDataList } from '../../utils/parseData';

describe('products reducer', () => {
  it('cart/GET_CART_ITEMS', () => {
    const requestState = cartReducer(undefined, { type: GET_CART_ITEMS_REQUEST });

    expect(requestState).toEqual<CartState>({
      loading: true,
      error: null,
      cartItems: [],
    });

    const successState = cartReducer(requestState, {
      type: GET_CART_ITEMS_SUCCESS,
      payload: parseCartItemDataList(mockCartResponse.data),
    });

    expect(successState).toEqual<CartState>({
      loading: false,
      error: null,
      cartItems: parseCartItemDataList(mockCartResponse.data),
    });

    const error = new Error('test error');

    const failureState = cartReducer(requestState, {
      type: GET_CART_ITEMS_FAILURE,
      error: error,
    });

    expect(failureState).toEqual<CartState>({
      loading: false,
      error: error,
      cartItems: [],
    });
  });
});
