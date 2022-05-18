import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import shoppingCartReducer from './shoppingCart';

const persistConfig = {
  key: 'root',
  storage,
};

export default persistReducer(persistConfig, shoppingCartReducer);
