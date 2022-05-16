import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import productsReducer from './products';
import productReducer from './product';
import cartsReducer from './carts';

const rootReducer = combineReducers({
  productsReducer,
  cartsReducer,
  productReducer,
});
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
