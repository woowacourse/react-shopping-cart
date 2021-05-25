import { combineReducers } from 'redux';
import { cartReducer } from './reducers/cart';
import { productReducer } from './reducers/products';

const rootReducer = combineReducers({ product: productReducer, cart: cartReducer });

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
