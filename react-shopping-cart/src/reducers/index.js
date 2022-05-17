import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import shoppingBasketReducer from './shoppingBasket';

const persistConfig = {
  key: 'root',
  storage,
};

export default persistReducer(persistConfig, shoppingBasketReducer);
