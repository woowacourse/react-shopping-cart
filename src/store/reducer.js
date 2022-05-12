import { combineReducers } from 'redux';
import TYPE from './types';

const initialState = {
  products: [],
  carts: [],
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPE.PRODUCTS_LOAD:
      return { ...state, products: action.payload };
    case TYPE.CARTS_LOAD:
      return { ...state, carts: action.payload };
    default:
      return { ...state };
  }
};

const rootReducer = combineReducers({ productsReducer });

export default rootReducer;
