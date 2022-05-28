import { createAsyncState } from 'lib/requestUtils';

import { PRODUCTS_ACTIONS } from '../types';

const getList = {
  pending: () => ({
    type: PRODUCTS_ACTIONS.UPDATE_PRODUCT_LIST_PENDING,
    async: createAsyncState.pending(),
  }),

  success: (payload) => ({
    type: PRODUCTS_ACTIONS.UPDATE_PRODUCT_LIST_SUCCESS,
    payload,
    async: createAsyncState.success(),
  }),

  error: (payload) => ({
    type: PRODUCTS_ACTIONS.UPDATE_PRODUCT_LIST_ERROR,
    async: createAsyncState.error(payload),
  }),
};

export { getList };
