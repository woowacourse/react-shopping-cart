import React, { Suspense } from 'react';
import ProductList from '../../components/ProductPage/ProductList/ProductList';
import ProductListSkeleton from '../../components/ProductPage/ProductList/ProductListSkeleton';

const ProductPage = () => {
  return (
    <Suspense fallback={<ProductListSkeleton />}>
      <ProductList />
    </Suspense>
  );
};

export default ProductPage;
