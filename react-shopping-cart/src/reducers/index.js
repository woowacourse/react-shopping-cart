import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import productListReducer from './productList';
import shoppingBasketReducer from './shoppingBasket';
import STATE_KEY from 'constants/stateKey';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: [STATE_KEY.PRODUCT_LIST_REDUCER],
};

const rootReducer = combineReducers({
  [STATE_KEY.PRODUCT_LIST_REDUCER]: productListReducer,
  [STATE_KEY.SHOPPING_BASKET_REDUCER]: shoppingBasketReducer,
});

export default persistReducer(persistConfig, rootReducer);
