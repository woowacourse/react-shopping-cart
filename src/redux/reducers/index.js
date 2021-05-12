import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import productListReducer from './productList';
import myShoppingCartReducer from './myShoppingCart';
import loadingReducer from './loading';
import checkedProductReducer from './checkedProductList';
import productAmountDictReducer from './productAmount';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  myShoppingCartReducer,
  loadingReducer,
  productListReducer,
  checkedProductReducer,
  productAmountDictReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
