import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from 'components/Header';
import Snackbar from 'components/Snackbar';

import Body from 'styles/Body';

import ProductsPage from './pages/ProductsPage';
import ProductPage from 'pages/ProductPage';
import CartsPage from 'pages/CartsPage';
import NotFoundPage from 'pages/NotFoundPage';

const Router = () => {
  const { show, message } = useSelector((state) => state.snackbar);

  return (
    <BrowserRouter>
      <Header />
      <Body>
        <Routes>
          <Route path="/" element={<ProductsPage />} />
          <Route path="/products/:page" element={<ProductsPage />} />
          <Route path="/product/:productId" element={<ProductPage />} />
          <Route path="/carts" element={<CartsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        {show && <Snackbar key={Date.now()} message={message} />}
      </Body>
    </BrowserRouter>
  );
};

export default Router;
