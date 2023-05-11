import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProductPage from './pages/ProductPage/ProductPage';
import { Content, Layout } from './components/common/Layout/Layout';

const Router = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Layout>
        <Routes>
          <Route element={<Content />}>
            <Route index element={<ProductPage />} />
          </Route>
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
