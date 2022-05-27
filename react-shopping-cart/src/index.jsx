import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createStore } from 'redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from 'styled-components';

import ErrorPage from 'pages/ErrorPage/ErrorPage.page';
import ProductList from 'pages/ProductList/ProductList.page';
import ShoppingCartList from 'pages/ShoppingCartList/ShoppingCartList.page';

import ErrorBoundary from 'components/ErrorBoundary/ErrorBoundary';

import rootReducer from 'redux/reducers';

import GlobalStyle from 'styles/GlobalStyle';
import theme from 'styles/theme';

const store = createStore(rootReducer);
const persistor = persistStore(store);

if (process.env.NODE_ENV === 'development') {
  const { worker } = require('./mocks/browser');
  worker.start({
    serviceWorker: {
      url: '/react-shopping-cart/mockServiceWorker.js',
    },
  });
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <GlobalStyle />
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <ThemeProvider theme={theme}>
            <ErrorBoundary fallback={<ErrorPage>오류가 발생했습니다</ErrorPage>}>
              <Routes>
                <Route path="/" element={<ProductList />} />
                <Route path="/cart" element={<ShoppingCartList />} />
                <Route path="/*" element={<ErrorPage>존재하지 않는 페이지입니다</ErrorPage>} />
              </Routes>
            </ErrorBoundary>
          </ThemeProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
