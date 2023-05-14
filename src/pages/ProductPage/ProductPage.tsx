import AsyncBoundary from '../../components/AsyncBoundary/AsyncBoundary';
import ProductList from '../../components/ProductPage/ProductList/ProductList';

const ProductPage = () => {
  return (
    <AsyncBoundary errorFallback={<h1>list error...</h1>}>
      <ProductList />
    </AsyncBoundary>
  );
};

export default ProductPage;
