import { combineReducers } from 'redux';

import { cartListReducer } from './cartList/reducer';
import { itemListReducer } from './itemList/reducer';

const rootReducer = combineReducers({ itemListReducer, cartListReducer });

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
