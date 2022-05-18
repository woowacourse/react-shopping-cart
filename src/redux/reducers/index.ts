import { combineReducers } from 'redux';

import { cartListReducer } from './cartListReducer';
import { itemListReducer } from './itemListReducer';

const rootReducer = combineReducers({ itemListReducer, cartListReducer });

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
