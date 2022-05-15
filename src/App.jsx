import React from 'react';
import { Route, Routes } from 'react-router-dom';
import GlobalStyles from 'styles/globalStyles';

import Layout from 'components/common/Layout';
import ProductListPage from 'pages/ProductList';
import ProductDetailPage from 'pages/ProductDetail';
import NotFoundPage from 'pages/NotFound';

const App = () => {
  return (
    <div>
      <GlobalStyles />
      <Layout>
        <Routes>
          <Route path="/react-shopping-cart" element={<ProductListPage />} />
          <Route path="/react-shopping-cart/product/:id" element={<ProductDetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </div>
  );
};

export default App;
