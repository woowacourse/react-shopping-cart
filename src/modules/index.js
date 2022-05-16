import { combineReducers } from 'redux';
import productListReducer from 'modules/api';

const rootReducer = combineReducers({ productListReducer });

export default rootReducer;
