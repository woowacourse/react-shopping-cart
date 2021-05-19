import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

axios.defaults.baseURL =
  process.env.NODE_ENV === 'development'
    ? '/'
    : 'https://shopping-cart.techcourse.co.kr';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
