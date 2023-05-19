import ProductList from '../../components/ProductList';
import { ErrorBoundary } from "react-error-boundary";

function Home() {

  return (
    <ErrorBoundary fallback={<div>상품 목록을 불러오는 도중 문제가 발생했습니다.</div>}>
      <ProductList />
    </ErrorBoundary>
  );
}

export default Home;
