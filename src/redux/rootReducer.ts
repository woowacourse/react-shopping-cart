import { combineReducers } from 'redux';

import { cartListReducer } from './cartList/reducer';
import { itemListReducer } from './itemList/reducer';

const rootReducer = combineReducers({ itemList: itemListReducer, cartList: cartListReducer });

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
