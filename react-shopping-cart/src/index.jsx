import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import thunk from 'redux-thunk';
import { ThemeProvider } from 'styled-components';
import rootReducer from 'reducers';
import { ProductList, ProductDetail, NotFound, ShoppingBasket } from 'pages';
import { GlobalStyle, theme } from 'styles';
import PATH from 'constants/path';

const store = createStore(rootReducer, applyMiddleware(thunk));
const persistor = persistStore(store);

if (process.env.NODE_ENV === 'development') {
  if (window.location.pathname === process.env.PUBLIC_URL) {
    window.location.pathname = `${process.env.PUBLIC_URL}/`;
  }

  const { worker } = require('./mocks/browser');

  worker.start({
    serviceWorker: {
      url: `${process.env.PUBLIC_URL}/mockServiceWorker.js`,
    },
    onUnhandledRequest: 'bypass',
  });
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <GlobalStyle />
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <ThemeProvider theme={theme}>
          <div className="App">
            <Routes>
              <Route path={PATH.MAIN} element={<ProductList />} />
              <Route path={PATH.PRODUCT_DETAIL} element={<ProductDetail />} />
              <Route path={PATH.SHOPPING_BASKET} element={<ShoppingBasket />} />
              <Route path={PATH.NOT_FOUND} element={<NotFound />} />
            </Routes>
          </div>
        </ThemeProvider>
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
