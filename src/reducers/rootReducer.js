import { combineReducers } from 'redux';
import productsReducer from 'reducers/products/products.reducer';
import productReducer from 'reducers/product/product.reducer';
import cartReducer from 'reducers/cart/cart.reducer';
import orderListReducer from './orderList/orderList.reducer';

const rootReducer = () =>
  combineReducers({
    products: productsReducer,
    product: productReducer,
    cart: cartReducer,
    orderList: orderListReducer,
  });

export default rootReducer;
