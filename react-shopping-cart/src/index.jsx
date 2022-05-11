import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import ProductList from 'pages/ProductListPage/ProductList.page';
import shoppingCartReducer from 'reducers';
import GlobalStyle from './styles/GlobalStyle';
import theme from './styles/theme';

const store = createStore(shoppingCartReducer);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <GlobalStyle />
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Routes>
            <Route path="/" element={<ProductList />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
