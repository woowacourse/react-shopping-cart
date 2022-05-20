import { combineReducers } from 'redux';
import productList from 'store/productList/reducer';
import cartProductList from './cartProductList/reducer';

const rootReducer = combineReducers({ productList, cartProductList });

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
