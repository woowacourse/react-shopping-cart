import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import GlobalStyle from './Global.style';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <>
      <GlobalStyle />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </>
  </React.StrictMode>,
  document.getElementById('root')
);
