import { Suspense } from 'react';

import Header from '../components/Header/Header';
import ProductList from '../components/Product/ProductList/ProductList';
import LoadingSpinner from '../components/utils/LoadingSpinner/LoadingSpinner';

const ProductListPage = () => {
  return (
    <>
      <Header />
      <main>
        <Suspense fallback={<LoadingSpinner />}>
          <ProductList />
        </Suspense>
      </main>
    </>
  );
};

export default ProductListPage;
