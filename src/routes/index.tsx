import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Layout from 'components/@common/Layout';
import ProductListPage from 'pages/ProductListPage';
import LoadingSpinner from 'components/@common/LoadingSpinner';

const ProductDetailPage = lazy(() => import('pages/ProductDetailPage'));
const CartPage = lazy(() => import('pages/CartPage'));
const NotFoundPage = lazy(() => import('pages/NotFoundPage'));

const Routers = () => {
  return (
    <BrowserRouter basename="/react-shopping-cart">
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="" element={<ProductListPage />} />
            <Route path="product/:id" element={<ProductDetailPage />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Routers;
