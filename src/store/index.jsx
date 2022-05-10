import { legacy_createStore as createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { actionTypes } from './actionTypes';

const initialState = {
  productList: [],
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_PRODUCT_LIST:
      return {
        ...state,
        productList: [...action.productList],
      };
    default:
      return state;
  }
}

const store = createStore(reducer, composeWithDevTools());

export default store;
