import { applyMiddleware, combineReducers, createStore } from 'redux';
import ReduxThunk from 'redux-thunk';

import cartReducer from './Cart/reducer';
import errorMessageReducer from './ErrorMessage/reducer';
import ordersReducer from './Orders/reducer';
import productListReducer from './Products/reducer';
import productDetailReducer from './ProductDetail/reducer';
import SnackbarReducer from './Snackbar/reducer';

import errorMiddleware from './middlewares/errorMiddleware';

const rootReducer = combineReducers({
  products: productListReducer,
  cart: cartReducer,
  orders: ordersReducer,
  errorMessage: errorMessageReducer,
  productDetail: productDetailReducer,
  snackbar: SnackbarReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk, errorMiddleware));

export default store;
