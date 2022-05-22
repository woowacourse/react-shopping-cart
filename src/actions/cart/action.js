import { createAsyncState } from 'lib/requestUtils';

import { CARTS_ACTIONS } from '../types';

const getCartListAction = {
  pending: () => ({
    type: CARTS_ACTIONS.UPDATE_CART_LIST_PENDING,
    async: createAsyncState.pending(),
  }),

  success: (payload) => ({
    type: CARTS_ACTIONS.UPDATE_CART_LIST_SUCCESS,
    payload,
    async: createAsyncState.success(),
  }),

  error: (payload) => ({
    type: CARTS_ACTIONS.UPDATE_CART_LIST_PENDING,
    async: createAsyncState.error(payload),
  }),
};

const addCartListAction = {
  pending: () => ({
    type: CARTS_ACTIONS.ADD_CART_LIST_PENDING,
    async: createAsyncState.pending(),
  }),

  success: (payload) => ({
    type: CARTS_ACTIONS.ADD_CART_LIST_SUCCESS,
    payload,
    async: createAsyncState.success(),
  }),

  error: (payload) => ({
    type: CARTS_ACTIONS.ADD_CART_LIST_ERROR,
    async: createAsyncState.error(payload),
  }),
};

export { getCartListAction, addCartListAction };
