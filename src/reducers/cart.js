/* eslint-disable no-param-reassign */
import produce from 'immer';

import { CARTS_ACTIONS } from 'actions/types';
import { createAsyncState } from 'lib/requestUtils';

const initialState = {
  items: createAsyncState.initial([]),
};

export default (state = initialState, action) => {
  const { type, payload = {}, async = {} } = action;

  switch (type) {
    case CARTS_ACTIONS.UPDATE_CART_LIST_SUCCESS:
      return produce(state, (draft) => {
        draft.items = { ...draft.items, ...async };
        draft.items.content = payload;
      });

    case CARTS_ACTIONS.UPDATE_CART_LIST_PENDING:
    case CARTS_ACTIONS.UPDATE_CART_LIST_ERROR:
      return { ...state, items: { ...state.items, ...async } };

    default:
      return state;
  }
};
