import { combineReducers } from 'redux';

const initialState = {
  products: [],
  carts: [],
};

// eslint-disable-next-line default-param-last
const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOAD_PRODUCTS':
      return { ...state, products: action.payload };
    case 'LOAD_CARTS':
      return { ...state, carts: action.payload };
    default:
      return { ...state };
  }
};

const rootReducer = combineReducers({ productsReducer });

export default rootReducer;
