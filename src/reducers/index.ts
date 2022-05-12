import { StoreState, Action } from '../types';
import { types } from '../actions/actions';

const initialState: StoreState = {
  productList: [],
};

const rootReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case types.LOAD_PRODUCTS_FULFILLED: {
      return { ...state, productList: action.payload };
    }
    default:
      return state;
  }
};

export default rootReducer;
