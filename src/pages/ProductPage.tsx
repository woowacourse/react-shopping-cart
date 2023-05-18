import React, { Suspense } from 'react';
import Header from '../components/Header';
import ProductList from '../components/ProductList';
import LoadingPage from './LoadingPage';
import ErrorBoundary from '../components/ErrorBoundary';

const ProductPage: React.FC = () => {
  return (
    <>
      <Header />
      <ErrorBoundary fallback={<div>Something went wrong.</div>}>
        <Suspense fallback={<LoadingPage />}>
          <ProductList />
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

export default ProductPage;
