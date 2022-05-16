import React from 'react';
import {ThemeProvider} from 'styled-components';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Header from 'component/common/Header';
import ProductListPage from 'page/ProductListPage';
import ProductDetailPage from 'page/ProductDetailPage';
import ProductCartPage from 'page/ProductCartPage';

import theme from 'theme/theme';
import {GlobalStyles} from 'style/globalStyle';

import {PATH} from 'constant';

export default function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div className="App">
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
