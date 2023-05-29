import AsyncBoundary from '../../components/AsyncBoundary/AsyncBoundary';
import Loading from '../../components/common/Loading/Loading';
import ProductList from '../../components/ProductPage/ProductList/ProductList';

const ProductPage = () => {
  return (
    <AsyncBoundary
      loadingFallback={<Loading />}
      errorFallback={<h1>list error...</h1>}>
      <ProductList />
    </AsyncBoundary>
  );
};

export default ProductPage;
