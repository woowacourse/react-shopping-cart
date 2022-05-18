import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import productsReducer from './products';
import productReducer from './product';
import cartsReducer from './carts';

const rootReducer = combineReducers({
  products: productsReducer,
  carts: cartsReducer,
  product: productReducer,
});
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
