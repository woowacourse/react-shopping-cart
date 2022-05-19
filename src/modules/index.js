import { combineReducers } from 'redux';
import productListReducer from 'modules/productList';
import productReducer from 'modules/product';
import cartReducer from 'modules/cart';

const rootReducer = combineReducers({ productListReducer, productReducer, cartReducer });

export default rootReducer;
