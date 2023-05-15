import { Suspense } from 'react';

import ProductList from '../components/ProductList/ProductList';
import Header from '../components/common/Header/Header';

const ProductListPage = () => {
  return (
    <>
      <Header />
      <main>
        <Suspense fallback={<ProductList.Skeleton />}>
          <ProductList />
        </Suspense>
      </main>
    </>
  );
};

export default ProductListPage;
