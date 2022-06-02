import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { combineReducers } from 'redux';
import productReducer from '@/store/product/reducer';
import cartReducer from '@/store/cart/reducer';
import customerReducer from '@/store/customer/reducer';
import globalReducer from '@/store/global/reducer';

const rootReducer = combineReducers({
  global: globalReducer,
  product: productReducer,
  cart: cartReducer,
  customer: customerReducer,
});

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export type RootState = ReturnType<typeof rootReducer>;
