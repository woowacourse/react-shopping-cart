import { combineReducers } from 'redux';
import productList from 'store/productList/reducer';
import cartProductList from './cartProductList/reducer';

const rootReducer = combineReducers({ product: productList, cart: cartProductList });

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
