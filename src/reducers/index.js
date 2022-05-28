import { combineReducers } from 'redux';

import cart from './cart';
import products from './products';

export default combineReducers({ products, cart });
