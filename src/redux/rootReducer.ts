import { combineReducers } from 'redux';

import { cartListReducer } from './cartList/cartListReducer';
import { itemListReducer } from './itemList/itemListReducer';

const rootReducer = combineReducers({ itemListReducer, cartListReducer });

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
