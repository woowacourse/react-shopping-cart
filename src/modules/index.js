import { combineReducers } from 'redux';
import productReducer from './product';
import productListReducer from 'modules/productList';

const rootReducer = combineReducers({ productReducer, productListReducer });

export default rootReducer;
