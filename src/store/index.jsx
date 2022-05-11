import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { actionTypes } from './actionTypes';
import ReduxThunk from 'redux-thunk';

const initialState = {
  productList: [],
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_PRODUCT_LIST:
      return {
        ...state,
        productList: [...action.payload],
      };
    default:
      return state;
  }
}

const store = createStore(reducer, composeWithDevTools(applyMiddleware(ReduxThunk)));

export default store;
