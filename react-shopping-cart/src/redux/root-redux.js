import { combineReducers } from 'redux';

import cartsReducer from 'redux/carts/carts.reducer';
import productsReducer from 'redux/products/products.reducer';

const rootReducer = combineReducers({
  products: productsReducer,
  carts: cartsReducer,
});

export default rootReducer;
