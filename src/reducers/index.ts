import { StoreState, Action } from '../types';
import { types } from '../actions/actions';

const initialState: StoreState = {
  isLoading: false,
  error: null,
  productList: [],
  productDetail: null,
};

const rootReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case `${types.GET_PRODUCT_LIST}_PENDING`: {
      return { ...state, isLoading: true, error: null };
    }
    case `${types.GET_PRODUCT_LIST}_FULFILLED`: {
      return { ...state, isLoading: false, productList: action.payload };
    }
    case `${types.GET_PRODUCT_LIST}_REJECTED`: {
      return { ...state, isLoading: false, error: action.payload };
    }
    case `${types.GET_PRODUCT_DETAIL}_PENDING`: {
      return { ...state, isLoading: true, error: null };
    }
    case `${types.GET_PRODUCT_DETAIL}_FULFILLED`: {
      return { ...state, isLoading: false, productDetail: action.payload };
    }
    case `${types.GET_PRODUCT_DETAIL}_REJECTED`: {
      return { ...state, isLoading: false, error: action.payload };
    }
    default:
      return state;
  }
};

export default rootReducer;
