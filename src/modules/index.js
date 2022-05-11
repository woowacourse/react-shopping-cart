import { combineReducers } from 'redux';
import productListReducer from './productList';

const rootReducer = combineReducers({ productListReducer });

export default rootReducer;
