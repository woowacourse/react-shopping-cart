import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import ReduxThunk from 'redux-thunk';

import cartReducer from 'redux/cart/cartReducer';
import productsReducer from 'redux/products/productsReducer';

const rootReducer = combineReducers({
  cart: cartReducer,
  products: productsReducer,
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(ReduxThunk)));

export { store };
