import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import {createStore, applyMiddleware, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import reduxThunk from 'redux-thunk';
import productListReducer from 'store/modules/productList';
import cartReducer from 'store/modules/cart';

const rootReducer = combineReducers({
  productListReducer,
  cartReducer,
});

const store = createStore(rootReducer, applyMiddleware(reduxThunk)); //수정

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);
