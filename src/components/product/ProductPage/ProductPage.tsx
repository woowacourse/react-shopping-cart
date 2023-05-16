import { Suspense } from 'react';
import ProductList from '../ProductList/ProductList';
import ProductListFallback from '../ProductList/ProductListFallback';

const ProductPage = () => {
  return (
    <Suspense fallback={<ProductListFallback />}>
      <ProductList />
    </Suspense>
  );
};
export default ProductPage;
