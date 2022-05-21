import { combineReducers } from 'redux';
import productListReducer from 'reducers/productList/productList.reducer';
import productReducer from 'reducers/product/product.reducer';
import cartListReducer from 'reducers/cartList/cartList.reducer';
import orderListReducer from './orderList/orderList.reducer';

const rootReducer = () =>
  combineReducers({
    productList: productListReducer,
    product: productReducer,
    cartList: cartListReducer,
    orderList: orderListReducer,
  });

export default rootReducer;
