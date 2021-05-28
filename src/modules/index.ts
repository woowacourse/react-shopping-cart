import { combineReducers } from 'redux';
import { productsReducer } from './products/reducer';
import { layoutReducer } from './layout/reducer';

const rootReducer = combineReducers({ products: productsReducer, layout: layoutReducer });

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
