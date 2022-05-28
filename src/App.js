import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import theme from 'style/theme';
import GlobalStyle from 'style/GlobalStyle';
import ProductList from 'pages/ProductList';
import rootReducer from 'modules';
import Header from 'containers/Header';
import CartList from 'pages/CartList';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(ReduxThunk)));

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Header />
        <Routes>
          <Route path="/react-shopping-cart" element={<ProductList />} />
          <Route path="/cart-list" element={<CartList />} />
        </Routes>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
