import { Action, StoreState } from 'types';

import { types } from 'redux/actions/actions';

const initialState: StoreState = {
  productList: [],
  productDetail: null,
};

const rootReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case types.GET_PRODUCT_LIST_FULFILLED: {
      return { ...state, productList: action.payload };
    }
    case types.GET_PRODUCT_DETAIL_FULFILLED: {
      return { ...state, productDetail: action.payload };
    }
    default:
      return state;
  }
};

export default rootReducer;
