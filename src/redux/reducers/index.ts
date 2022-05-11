import { combineReducers } from 'redux';
import { itemListReducer } from './itemListReducer';
import { cartListReducer } from './cartListReducer';

const rootReducer = combineReducers({ itemListReducer, cartListReducer });

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
