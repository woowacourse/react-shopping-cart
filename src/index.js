import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import * as Styled from './style.js';

ReactDOM.render(
  <React.StrictMode>
    <App />
    <Styled.GlobalStyle />
  </React.StrictMode>,
  document.getElementById('root')
);
