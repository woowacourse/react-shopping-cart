import ProductList from 'pages/ProductList';

import Snackbar from 'components/Snackbar';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from 'store';

import { Global } from '@emotion/react';
import GlobalStyles from 'styles/GlobalStyles';
import ProductDetail from 'pages/ProductDetail';
import Cart from 'pages/Cart';

const ShoppingCartApp = () => (
  <Provider store={store}>
    <Global styles={GlobalStyles} />
    <Snackbar />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/product" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<ProductList />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);

export default ShoppingCartApp;
