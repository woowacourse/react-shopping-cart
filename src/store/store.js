import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import productsReducer from 'store/products';
import productReducer from 'store/product';
import cartsReducer from 'store/carts';

const rootReducer = combineReducers({
  products: productsReducer,
  carts: cartsReducer,
  product: productReducer,
});
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
