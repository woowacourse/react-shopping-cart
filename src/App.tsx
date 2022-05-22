import React, { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import GlobalStyles from 'styles/globalStyles';
import ProductListPage from 'pages/ProductListPage';
import Layout from 'components/@common/Layout';

const ProductDetailPage = lazy(() => import('pages/ProductDetailPage'));
const CartPage = lazy(() => import('pages/CartPage'));
const NotFoundPage = lazy(() => import('pages/NotFoundPage'));

const App = () => {
  return (
    <div>
      <GlobalStyles />
      <Suspense fallback={<div>loading...</div>}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="" element={<ProductListPage />} />
          <Route path="product/:id" element={<ProductDetailPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
      </Suspense>
    </div>
  );
};

export default App;
