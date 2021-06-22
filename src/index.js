import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './redux';
import { App } from './pages';
import * as S from './style.js';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
    <S.GlobalStyle />
  </React.StrictMode>,
  document.getElementById('root')
);
