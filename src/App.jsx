import React from 'react';
import { Route, Routes } from 'react-router-dom';
import GlobalStyles from 'styles/globalStyles';

import Layout from 'components/common/Layout';
import ProductList from 'components/ProductList';
import ProductDetail from 'components/ProductDetail';
import NotFound from 'components/NotFound';

const App = () => {
  return (
    <div>
      <GlobalStyles />
      <Layout>
        <Routes>
          <Route path="/react-shopping-cart" element={<ProductList />} />
          <Route path="/react-shopping-cart/product/:id" element={<ProductDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </div>
  );
};

export default App;
