import { Suspense } from 'react';

import { ProductList } from '../../ProductList/ProductList';
import { ProductListSkeleton } from '../../ProductList/ProductListSkeleton/ProductListSkeleton';

export const Home = () => {
  return (
    <Suspense fallback={<ProductListSkeleton />}>
      <ProductList />
    </Suspense>
  );
};
