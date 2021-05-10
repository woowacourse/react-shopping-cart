import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './redux';
import { App } from './components/App';
import * as Styled from './style.js';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
    <Styled.GlobalStyle />
  </React.StrictMode>,
  document.getElementById('root')
);
