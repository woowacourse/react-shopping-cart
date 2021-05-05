import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import GlobalStyle from './globalStyle';

ReactDOM.render(
  <GlobalStyle>
    <App />
  </GlobalStyle>,
  document.getElementById('root')
);
