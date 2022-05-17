import { combineReducers } from 'redux';
import TYPE from 'store/types';

const initialState = {
  products: [],
  carts: [],
};

const productsReducer = (state = initialState.products, action) => {
  switch (action.type) {
    case TYPE.PRODUCTS_LOAD:
      return { ...state, products: action.payload };
    default:
      return state;
  }
};

const cartsReducer = (state = initialState.carts, action) => {
  switch (action.type) {
    case TYPE.CARTS_LOAD:
      return { ...state, carts: action.payload };
    case TYPE.CARTS_ADD:
      return { ...state, carts: state.carts.concat(action.payload) };
    case TYPE.CARTS_DELETE:
      return {
        ...state,
        carts: state.carts.filter((cart) => cart.id !== action.payload),
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  products: productsReducer,
  carts: cartsReducer,
});

export default rootReducer;
