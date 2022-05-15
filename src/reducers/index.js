import { combineReducers } from 'redux';
import snackbar from './snackbar';
import products from './products';
import cart from './cart';

export default combineReducers({ products, cart, snackbar });
