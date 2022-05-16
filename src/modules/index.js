import { combineReducers } from 'redux';
import productListReducer from 'modules/productList';
import productReducer from 'modules/product';

const rootReducer = combineReducers({ productListReducer, productReducer });

export default rootReducer;
