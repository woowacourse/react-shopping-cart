import orderList from './orderList.reducer';
import shoppingCart from './shoppingCart.reducer';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
  shoppingCart,
  orderList,
});

const persistConfig = {
  key: 'root',
  storage,
};

export default persistReducer(persistConfig, rootReducer);
