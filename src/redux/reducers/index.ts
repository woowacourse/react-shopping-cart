import { combineReducers } from 'redux';
import { itemListReducer } from './itemListReducer';
import { cartListReducer } from './cartListReducer';
import { snackbarReducer } from './snackbarReducer';

const rootReducer = combineReducers({ itemListReducer, cartListReducer, snackbarReducer });

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
