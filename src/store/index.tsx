import { combineReducers } from 'redux';
import productReducer from 'store/product/reducer';
import productListReducer from 'store/productList/reducer';

const rootReducer = combineReducers({ productReducer, productListReducer });

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
