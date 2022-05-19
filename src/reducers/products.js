import { PRODUCTS_ACTIONS } from 'actions/types';
import { createRequestState } from 'lib/requestUtils';

const initialState = {
  productInfo: createRequestState.initial([]),
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case PRODUCTS_ACTIONS.UPDATE_PRODUCT_LIST:
    case PRODUCTS_ACTIONS.UPDATE_PRODUCT_LIST_SUCCESS:
    case PRODUCTS_ACTIONS.UPDATE_PRODUCT_LIST_ERROR:
      return { ...state, productInfo: { ...state.productInfo, ...payload } };

    default:
      return state;
  }
};
