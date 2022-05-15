import { Action, StoreState } from 'types';

import CONDITION from 'constants/condition';
import { types } from 'redux/actions/actions';

const initialState: StoreState = {
  condition: CONDITION.NONE,
  productList: [],
  productDetail: null,
};

const rootReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case types.GET_PRODUCT_LIST: {
      return { ...state, condition: CONDITION.LOADING };
    }
    case types.GET_PRODUCT_LIST_SUCCESS: {
      return {
        ...state,
        condition: CONDITION.COMPLETE,
        productList: action.payload,
      };
    }
    case types.GET_PRODUCT_LIST_ERROR: {
      return { ...state, condition: CONDITION.ERROR, productList: [] };
    }
    case types.GET_PRODUCT_DETAIL: {
      return { ...state, condition: CONDITION.LOADING };
    }
    case types.GET_PRODUCT_DETAIL_SUCCESS: {
      return {
        ...state,
        condition: CONDITION.COMPLETE,
        productDetail: action.payload,
      };
    }
    case types.GET_PRODUCT_DETAIL_ERROR: {
      return { ...state, condition: CONDITION.ERROR, productDetail: null };
    }
    default:
      return state;
  }
};

export default rootReducer;
