import { Action, Product } from '../../types';
import { TYPES } from '../actions';

const initialState: {
  isLoading: boolean;
  error: any;
  productList: Product[];
} = {
  isLoading: false,
  error: null,
  productList: [],
};

const products = (state = initialState, action: Action) => {
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
    default:
      return state;
  }
};

export default products;
export { initialState };
