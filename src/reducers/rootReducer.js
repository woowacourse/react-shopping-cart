import { combineReducers } from 'redux';
import productsReducer from 'reducers/products/products.reducer';
import productReducer from 'reducers/product/product.reducer';
import cartReducer from 'reducers/cart/cart.reducer';

const rootReducer = () =>
  combineReducers({
    products: productsReducer,
    product: productReducer,
    cart: cartReducer,
  });

export default rootReducer;
