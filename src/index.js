import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { cartAction, store } from './redux';
import { App } from './App.js';
import * as S from './GlobalStyle.js';

store.dispatch(cartAction.getProducts());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
    <S.GlobalStyle />
  </React.StrictMode>,
  document.getElementById('root')
);
