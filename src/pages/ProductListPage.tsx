import { Suspense } from 'react';

import ProductList from '../components/ProductList/ProductList';
import ProductListSkeleton from '../components/ProductList/ProductListSkeleton';
import Header from '../components/common/Header/Header';

const ProductListPage = () => {
  return (
    <>
      <Header />
      <main>
        <Suspense fallback={<ProductListSkeleton />}>
          <ProductList />
        </Suspense>
      </main>
    </>
  );
};

export default ProductListPage;
