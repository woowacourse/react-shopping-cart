import { productsReducer } from 'store/products/reducer';
import { cartsReducer } from 'store/carts/reducer';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  products: productsReducer,
  carts: cartsReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
