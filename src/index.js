import React from 'react';
import ReactDOM from 'react-dom/client';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import reduxThunk from 'redux-thunk';

import App from './App';
import 'fonts.css';

import productListReducer from 'store/modules/productList';
import cartReducer from 'store/modules/cart';

export const rootReducer = combineReducers({
  productListReducer,
  cartReducer,
});

export const store = createStore(rootReducer, applyMiddleware(reduxThunk));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);
