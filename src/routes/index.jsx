import React from 'react';
import { Route, Routes } from 'react-router-dom';

import ProductListPage from 'pages/Product';
import CartPage from 'pages/Cart';

function MainContent() {
  return (
    <Routes>
      <Route path="/" element={<ProductListPage />} />
      <Route path="/cart" element={<CartPage />} />
    </Routes>
  );
}

export default MainContent;
