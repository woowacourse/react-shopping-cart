import { combineReducers } from 'redux';
import productListReducer from 'modules/productList';

const rootReducer = combineReducers({ productListReducer });

export default rootReducer;
