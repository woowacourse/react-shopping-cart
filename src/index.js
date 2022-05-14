import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import App from './App';
import './index.css';

import rootReducer from 'modules';
import { setProductList } from 'modules/productList';
import { ThemeProvider } from 'styled-components';
import theme from 'styles/theme';

const store = createStore(rootReducer, composeWithDevTools());

const loadProductList = () => {
  fetch(`${process.env.REACT_APP_BASE_URL}/productList`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (!response.ok) {
        return;
      }

      return response.json();
    })
    .then((res) => store.dispatch(setProductList(res)));
};

loadProductList();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <App />
        </Provider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
