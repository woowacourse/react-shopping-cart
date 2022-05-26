import { combineReducers } from 'redux';
import productListReducer from 'reduxModule/productList';
import productReducer from 'reduxModule/product';
import cartReducer from 'reduxModule/cart';
import productInfoListReducer from './productInfoList';

const rootReducer = combineReducers({
  productListReducer,
  productReducer,
  cartReducer,
  productInfoListReducer,
});

export default rootReducer;
