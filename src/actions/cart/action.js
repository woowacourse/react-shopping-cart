import { createAsyncState } from 'lib/requestUtils';
import { number } from 'prop-types';

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

const updateCartItemSuccess = (payload) => ({
  type: CARTS_ACTIONS.UPDATE_CART_ITEM_SUCCESS,
  payload,
});

const updateCartItemChecked = (id, isChecked) => ({
  type: CARTS_ACTIONS.UPDATE_CART_ITEM_CHECKED,
  payload: { id, isChecked },
});

const removeCartItemSuccess = (id) => ({
  type: CARTS_ACTIONS.REMOVE_CART_ITEM_SUCCESS,
  payload: { id },
});

export {
  getCartListAction,
  addCartListAction,
  updateCartItemSuccess,
  updateCartItemChecked,
  removeCartItemSuccess,
};
