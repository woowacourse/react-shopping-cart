import cart from './cart';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import product from './product';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart'],
};

const rootReducer = combineReducers({
  product,
  cart,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
