import { Suspense } from 'react';
import ProductList from '../../views/ProductItemList/Components/ProductList/ProductList';
import SkeletonProduct from '../../views/ProductItemList/Components/ProductList/SkeletonProduct/SkeletonProduct';

function Home() {
  return (
    <Suspense fallback={<SkeletonProduct></SkeletonProduct>}>
      <ProductList />
    </Suspense>
  );
}

export default Home;
