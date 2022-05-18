import { combineReducers } from 'redux';
import productReducer from 'store/product/reducer';
import productListReducer from 'store/productList/reducer';
import { cartProductListReducer } from './cartProductList/reducer';

const rootReducer = combineReducers({ productReducer, productListReducer, cartProductListReducer });

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
