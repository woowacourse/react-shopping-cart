import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

axios.defaults.baseURL =
  process.env.NODE_ENV === 'development'
    ? '/'
    : 'https://mk27.pythonanywhere.com';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
