import React, { Suspense } from 'react';
import ProductList from '../../components/ProductPage/ProductList/ProductList';

const ProductPage = () => {
  return (
    <Suspense fallback={<h1>Products...</h1>}>
      <ProductList />
    </Suspense>
  );
};

export default ProductPage;
