/* eslint-disable no-param-reassign */
import produce from 'immer';

import { PRODUCTS_ACTIONS } from 'actions/types';
import { createAsyncState } from 'lib/requestUtils';

const initialState = {
  productInfo: createAsyncState.initial([]),
};

export default (state = initialState, action) => {
  const { type, payload = {}, async = {} } = action;

  switch (type) {
    case PRODUCTS_ACTIONS.UPDATE_PRODUCT_LIST_PENDING:
    case PRODUCTS_ACTIONS.UPDATE_PRODUCT_LIST_ERROR:
      return { ...state, productInfo: { ...state.productInfo, ...async } };

    case PRODUCTS_ACTIONS.UPDATE_PRODUCT_LIST_SUCCESS:
      return produce(state, (draft) => {
        draft.productInfo = { ...draft.productInfo, ...async };
        draft.productInfo.content = payload;
      });

    default:
      return state;
  }
};
