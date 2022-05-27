import { StoreState, Action } from '../types';
import { TYPES } from './actions';

const initialState: StoreState = {
  isLoading: false,
  error: null,
  productList: [],
  productDetail: null,
  cart: [],
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
    case `${TYPES.ADD_ITEM_TO_CART}_PENDING`: {
      return { ...state, isLoading: true, error: null };
    }
    case `${TYPES.ADD_ITEM_TO_CART}_FULFILLED`: {
      return { ...state, isLoading: false, cart: action.payload };
    }
    case `${TYPES.ADD_ITEM_TO_CART}_REJECTED`: {
      return { ...state, isLoading: false, error: action.payload };
    }
    case `${TYPES.GET_CART}_PENDING`: {
      return { ...state, isLoading: true, error: null };
    }
    case `${TYPES.GET_CART}_FULFILLED`: {
      return { ...state, isLoading: false, cart: action.payload };
    }
    case `${TYPES.GET_CART}_REJECTED`: {
      return { ...state, isLoading: false, error: action.payload };
    }
    case `${TYPES.UPDATE_QUANTITY}_PENDING`: {
      return { ...state, isLoading: true, error: null };
    }
    case `${TYPES.UPDATE_QUANTITY}_FULFILLED`: {
      return { ...state, isLoading: false, cart: action.payload };
    }
    case `${TYPES.UPDATE_QUANTITY}_REJECTED`: {
      return { ...state, isLoading: false, error: action.payload };
    }
    case `${TYPES.REMOVE_CART_ITEM}_PENDING`: {
      return { ...state, isLoading: true, error: null };
    }
    case `${TYPES.REMOVE_CART_ITEM}_FULFILLED`: {
      return { ...state, isLoading: false, cart: action.payload };
    }
    case `${TYPES.REMOVE_CART_ITEM}_REJECTED`: {
      return { ...state, isLoading: true, error: action.payload };
    }
    default:
      return state;
  }
};

export default rootReducer;
export { initialState };
