import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from 'styled-components';
import ProductList from 'pages/ProductList/ProductList.page';
import rootReducer from 'reducers';
import GlobalStyle from './styles/GlobalStyle';
import theme from './styles/theme';
import NotFound from 'pages/NotFound/NotFound.page';

const store = createStore(rootReducer);
const persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <GlobalStyle />
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <ThemeProvider theme={theme}>
            <Routes>
              <Route path="/" element={<ProductList />} />
              <Route path="/*" element={<NotFound />} />
            </Routes>
          </ThemeProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
