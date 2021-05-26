import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import myShoppingCartReducer from './myShoppingCart';
import loadingReducer from './loading';
import pageIndexReducer from './pageIndex';
import productListReducer from './productList';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  myShoppingCartReducer,
  loadingReducer,
  pageIndexReducer,
  productListReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
