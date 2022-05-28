import { CARTS_ACTIONS } from 'actions/types';

import { createAsyncState } from 'lib/requestUtils';

import cartReducer from './cart';

describe('장바구니 영역 상태 CURD 테스트', () => {
  test('1. 장바구니의 상품 목록을 처음 불러올 때 장바구니 내 모든 상태가 갱신되어야 한다.', () => {
    const initialState = { items: createAsyncState.initial([]) };
    const items = [
      {
        id: 1,
        image: 'image-url',
        name: 'COMPY',
        price: 5000,
        quantity: 1,
        isChecked: true,
      },
      {
        id: 2,
        image: 'image-url',
        name: 'COMPY2',
        price: 5000,
        quantity: 1,
        isChecked: true,
      },
    ];

    const updateCartListAction = {
      type: CARTS_ACTIONS.UPDATE_CART_LIST_SUCCESS,
      payload: items,
      async: createAsyncState.success(),
    };

    expect(cartReducer(initialState, updateCartListAction)).toEqual({
      items: {
        content: items,
        error: null,
        isLoaded: true,
        isLoading: false,
      },
    });
  });

  test('2. 상품 추가 시 해당 상품을 정상적으로 장바구니 상태에 추가해야 한다.', () => {
    const initialState = { items: createAsyncState.initial([]) };
    const item = {
      id: 1,
      image: 'image-url',
      name: 'COMPY',
      price: 5000,
      quantity: 1,
    };

    const addCartListAction = {
      type: CARTS_ACTIONS.ADD_CART_LIST_SUCCESS,
      payload: {
        ...item,
      },
    };

    expect(cartReducer(initialState, addCartListAction)).toEqual({
      items: {
        content: [{ ...item, isChecked: true }],
        error: null,
        isLoaded: false,
        isLoading: false,
      },
    });
  });

  test('3. 장바구니의 상품 정보를 업데이트 할 시, 해당 상품의 상태가 정상적으로 갱신되어야 한다.', () => {
    const targetItem = {
      id: 1,
      image: 'image-url',
      name: 'COMPY',
      price: 5000,
      quantity: 1,
    };
    const initialState = { items: createAsyncState.initial([targetItem]) };

    const updateCartItemAction = {
      type: CARTS_ACTIONS.UPDATE_CART_ITEM_SUCCESS,
      payload: { id: targetItem.id, quantity: 2 },
    };

    expect(cartReducer(initialState, updateCartItemAction)).toEqual({
      items: {
        content: [{ ...targetItem, quantity: 2 }],
        error: null,
        isLoaded: false,
        isLoading: false,
      },
    });
  });

  test('4. 장바구니 상품을 제거 요청한다면, 해당 상품의 상태가 정상적으로 제거되어야 한다.', () => {
    const targetItem = {
      id: 1,
      image: 'image-url',
      name: 'COMPY',
      price: 5000,
      quantity: 1,
    };
    const initialState = { items: createAsyncState.initial([targetItem]) };

    const removeCartItemAction = {
      type: CARTS_ACTIONS.REMOVE_CART_ITEM_SUCCESS,
      payload: { id: targetItem.id },
    };

    expect(cartReducer(initialState, removeCartItemAction)).toEqual({
      items: {
        content: [],
        error: null,
        isLoaded: false,
        isLoading: false,
      },
    });
  });
});
