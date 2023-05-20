import { Suspense, useEffect } from 'react';
import { useRecoilCallback } from 'recoil';

import ProductList from '../../components/product/ProductList/ProductList';
import ProductListSkeleton from '../../components/product/ProductList/ProductListSkeleton';
import { productListState } from '../../store/product';

const ProductListPage = () => {
  const refreshProductList = useRecoilCallback(({ refresh }) => () => {
    refresh(productListState);
  });

  useEffect(() => {
    refreshProductList();
  }, [refreshProductList]);

  return (
    <Suspense fallback={<ProductListSkeleton />}>
      <ProductList />
    </Suspense>
  );
};

export default ProductListPage;
