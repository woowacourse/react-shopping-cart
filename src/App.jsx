import React from 'react';
import GlobalStyles from 'styles/globalStyles';
import ProductList from 'components/ProductList';
import Layout from 'components/common/Layout';
import NotFound from 'components/NotFound';
import { Route, Routes } from 'react-router-dom';
import ProductDetail from 'components/ProductDetail';

const App = () => {
  return (
    <div>
      <GlobalStyles />
      <Layout>
        <Routes>
          <Route path="/react-shopping-cart" element={<ProductList />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/react-shopping-cart/product/:id" element={<ProductDetail />} />
        </Routes>
      </Layout>
    </div>
  );
};

export default App;
