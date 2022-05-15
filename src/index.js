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

const loadProductList = async () => {
  const response = await fetch(`${process.env.REACT_APP_BASE_URL}/productList`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    return;
  }

  const result = await response.json();
  store.dispatch(setProductList(result));
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
