import React from 'react';
import ErrorBoundary from '../../components/common/ErrorBoundary/ErrorBoundary';
import ProductList from '../../components/ProductPage/ProductList/ProductList';

const ProductPage = () => {
  return (
    <ErrorBoundary errorFallback={<h1>list error...</h1>}>
      <ProductList />
    </ErrorBoundary>
  );
};

export default ProductPage;
