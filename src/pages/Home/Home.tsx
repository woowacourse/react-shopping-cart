import { Suspense } from 'react';
import ProductList from '../../components/ProductList/ProductList';

function Home() {
  return (
    <Suspense fallback={<h2>로딩중입니다...</h2>}>
      <ProductList />
    </Suspense>
  );
}

export default Home;
