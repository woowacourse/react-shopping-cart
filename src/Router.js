import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from 'components/Header';

import ProductsPage from './pages/ProductsPage';

const Router = () => (
  <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<ProductsPage />} />
    </Routes>
  </BrowserRouter>
);

export default Router;
