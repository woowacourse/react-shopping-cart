import React from 'react';
import {ThemeProvider} from 'styled-components';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Header from 'components/common/Header';
import ProductListPage from 'pages/ProductListPage';
import ProductDetailPage from 'pages/ProductDetailPage';
import ProductCartPage from 'pages/ProductCartPage';

import theme from 'theme/theme';
import {GlobalStyles} from 'style';

import {PATH} from 'constants';

export default function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <Header />
          <Routes>
            <Route exact path={PATH.HOME} element={<ProductListPage />}></Route>
            <Route exact path={`${PATH.DETAIL}/:id`} element={<ProductDetailPage />}></Route>
            <Route exact path={PATH.CART} element={<ProductCartPage />}></Route>
          </Routes>
        </ThemeProvider>
      </div>
    </Router>
  );
}
