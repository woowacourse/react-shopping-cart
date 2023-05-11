import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProductPage from './pages/ProductPage/ProductPage';
import { Content, Layout } from './components/common/Layout/Layout';
import ErrorBoundary from './components/common/ErrorBoundary/ErrorBoundary';

const Router = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <ErrorBoundary page loadingFallback={<h1>Loading...</h1>}>
        <Layout>
          <Routes>
            <Route element={<Content />}>
              <Route index element={<ProductPage />} />
            </Route>
          </Routes>
        </Layout>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Router;
