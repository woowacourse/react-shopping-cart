import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import shoppingCart from './shoppingCart.reducer';
import orderList from './orderList.reducer';

const rootReducer = combineReducers({
  shoppingCart,
  orderList,
});

const persistConfig = {
  key: 'root',
  storage,
};

export default persistReducer(persistConfig, rootReducer);
