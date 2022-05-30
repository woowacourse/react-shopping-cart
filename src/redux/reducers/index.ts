import { combineReducers } from 'redux';
import cart from './cart';
import products from './products';
import productDetail from './productDetail';

const rootReducer = combineReducers({
  productsState: products,
  productDetailState: productDetail,
  cartState: cart,
});

export default rootReducer;
