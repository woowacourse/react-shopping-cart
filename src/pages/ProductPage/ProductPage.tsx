import React from 'react';
import ErrorBoundary from '../../components/common/ErrorBoundary/ErrorBoundary';
import ProductList from '../../components/ProductPage/ProductList/ProductList';
import ProductListSkeleton from '../../components/ProductPage/ProductList/ProductListSkeleton';

const ProductPage = () => {
  return (
    <ErrorBoundary
      errorFallback={<ProductPageError />}
      loadingFallback={<ProductListSkeleton />}
    >
      <ProductList />
    </ErrorBoundary>
  );
};

const ProductPageError = () => {
  return <h1>상품목록을 불러오는 데 실패했습니다.</h1>;
};

export default ProductPage;
