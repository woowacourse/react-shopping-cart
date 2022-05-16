import { StoreState, Action } from '../types';
import { TYPES } from './actions';

const initialState: StoreState = {
  isLoading: false,
  error: null,
  productList: [],
  productDetail: null,
};

const rootReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case `${TYPES.GET_PRODUCT_LIST}_PENDING`: {
      return { ...state, isLoading: true, error: null };
    }
    case `${TYPES.GET_PRODUCT_LIST}_FULFILLED`: {
      return { ...state, isLoading: false, productList: action.payload };
    }
    case `${TYPES.GET_PRODUCT_LIST}_REJECTED`: {
      return { ...state, isLoading: false, error: action.payload };
    }
    case `${TYPES.GET_PRODUCT_DETAIL}_PENDING`: {
      return { ...state, isLoading: true, error: null };
    }
    case `${TYPES.GET_PRODUCT_DETAIL}_FULFILLED`: {
      return { ...state, isLoading: false, productDetail: action.payload };
    }
    case `${TYPES.GET_PRODUCT_DETAIL}_REJECTED`: {
      return { ...state, isLoading: false, error: action.payload };
    }
    default:
      return state;
  }
};

export default rootReducer;
