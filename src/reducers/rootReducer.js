import { combineReducers } from 'redux';
import productsReducer from 'reducers/products/products.reducer';
import productReducer from 'reducers/product/product.reducer';

const rootReducer = () =>
  combineReducers({
    products: productsReducer,
    product: productReducer,
  });

export default rootReducer;
