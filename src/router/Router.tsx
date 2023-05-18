import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ProductListPage } from '../pages/ProductListPage';
import { CartProductPage } from '../pages/CartProductPage';

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<ProductListPage />} />
      <Route path="/cart" element={<CartProductPage />} />
    </Routes>
  );
};
