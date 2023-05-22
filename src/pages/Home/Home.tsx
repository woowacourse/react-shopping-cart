import { Suspense } from 'react';
import ProductList from '../../components/ProductList/ProductList';
import SkeletonProduct from '../../components/SkeletonProduct/SkeletonProduct';

function Home() {
  return (
    <Suspense fallback={<SkeletonProduct></SkeletonProduct>}>
      <ProductList />
    </Suspense>
  );
}

export default Home;
