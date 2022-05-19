import { combineReducers } from 'redux';
import productListReducer from 'store/productList/reducer';
import { cartProductListReducer } from './cartProductList/reducer';

const rootReducer = combineReducers({ productListReducer, cartProductListReducer });

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
