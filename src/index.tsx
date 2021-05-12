import React from 'react';
import ReactDOM from 'react-dom';

import axios from 'axios';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import App from './App';

import rootReducer from './modules';

import './index.css';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

axios.interceptors.response.use(
  response => response,
  error => error.response
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
