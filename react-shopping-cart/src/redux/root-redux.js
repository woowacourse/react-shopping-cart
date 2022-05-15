import { combineReducers } from 'redux';
import productsReducer from 'redux/products/products.reducer';
import cartsReducer from 'redux/carts/carts.reducer';

const rootReducer = combineReducers({
  products: productsReducer,
  carts: cartsReducer,
});

export default rootReducer;
