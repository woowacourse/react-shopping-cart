import React from 'react';
import {ThemeProvider} from 'styled-components';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Header from 'component/Header';
import ProductListPage from 'page/ProductListPage';
import ProductDetailPage from 'page/ProductDetailPage';
import ProductCartPage from 'page/ProductCartPage';

import theme from 'theme/theme';
import {GlobalStyles} from 'style/globalStyle';

import {PATH} from 'constant';

import NotFoundPage from 'page/NotFoundPage';

if (process.env.NODE_ENV === 'development') {
  const {worker} = require('./mocks/browsers');
  worker.start();
}

export default function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div className="App">
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <Header />
          <Routes>
            <Route path={PATH.HOME} element={<ProductListPage />}></Route>
            <Route path={`${PATH.DETAIL}/:id`} element={<ProductDetailPage />}></Route>
            <Route path={PATH.CART} element={<ProductCartPage />}></Route>
            <Route
              path={PATH.ORDER}
              element={<NotFoundPage> 아직 개발중인 페이지입니다🔨</NotFoundPage>}
            ></Route>
            <Route path="*" element={<NotFoundPage> 잘못 들어왔어요😢</NotFoundPage>}></Route>
          </Routes>
        </ThemeProvider>
      </div>
    </Router>
  );
}
