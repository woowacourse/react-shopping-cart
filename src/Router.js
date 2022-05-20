import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from 'components/Header';

import Body from 'styles/Body';

import ProductsPage from './pages/ProductsPage';
import CartsPage from 'pages/CartsPage';
import NotFoundPage from 'pages/NotFoundPage';

const Router = () => (
  <BrowserRouter>
    <Header />
    <Body>
      <Routes>
        <Route path="/" element={<ProductsPage />} />
        <Route path="/carts" element={<CartsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Body>
  </BrowserRouter>
);

export default Router;
