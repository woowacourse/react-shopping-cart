import { combineReducers } from 'redux';
import products from './products';
import carts from './cart';

export default combineReducers({ products, carts });
