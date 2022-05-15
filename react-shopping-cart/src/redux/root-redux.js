import { combineReducers } from 'redux';
import productsReducer from './products/products.reducer';
import cartsReducer from './carts/carts.reducer';

const rootReducer = combineReducers({
  products: productsReducer,
  carts: cartsReducer,
});

export default rootReducer;
