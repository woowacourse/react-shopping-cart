import ProductCardGrid from '../../components/ProductCardGrid/ProductCardGrid';
import Spinner from '../../components/Spinner/Spinner';
import useProductList from './useProductList';

function MainPage() {
  const { isLoading, productList } = useProductList();

  if (isLoading) return <Spinner />;

  return <ProductCardGrid productList={productList} />;
}

export default MainPage;
