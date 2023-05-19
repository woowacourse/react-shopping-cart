import { Suspense } from 'react';

import ProductList from '../components/ProductList/ProductList';
import ProductListSkeleton from '../components/ProductList/ProductListSkeleton';

const ProductListPage = () => {
  return (
    <Suspense fallback={<ProductListSkeleton />}>
      <ProductList />
    </Suspense>
  );
};

export default ProductListPage;
