import { applyMiddleware, combineReducers, createStore } from 'redux';
import ReduxThunk from 'redux-thunk';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import cartReducer from './Cart/reducer';
import errorMessageReducer from './ErrorMessage/reducer';
import ordersReducer from './Orders/reducer';
import productListReducer from './Products/reducer';
import productDetailReducer from './ProductDetail/reducer';
import SnackbarReducer from './Snackbar/reducer';

import errorMiddleware from './middlewares/errorMiddleware';

const persistConfig = {
  key: 'shoppingCart',
  storage,
  whitelist: ['cart'],
};

const rootReducer = combineReducers({
  products: productListReducer,
  cart: cartReducer,
  orders: ordersReducer,
  errorMessage: errorMessageReducer,
  productDetail: productDetailReducer,
  snackbar: SnackbarReducer,
});

const store = createStore(persistReducer(persistConfig, rootReducer), applyMiddleware(ReduxThunk, errorMiddleware));
const persistor = persistStore(store);

export default store;
export { persistor };
