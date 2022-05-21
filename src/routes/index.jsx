import React from 'react';
import { Route, Routes } from 'react-router-dom';

import ProductListPage from 'pages/Product';
import CartPage from 'pages/Cart';
import DetailProudctPage from 'pages/DetailProduct';

function MainContent() {
  return (
    <Routes>
      <Route path="/" element={<ProductListPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/product/:id" element={<DetailProudctPage />} />
    </Routes>
  );
}

export default MainContent;
