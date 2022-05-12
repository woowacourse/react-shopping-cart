import ProductCardGrid from '../../components/ProductCardGrid/ProductCardGrid';
import Spinner from '../../components/Spinner/Spinner';
import useMainPage from './useMainPage';

function MainPage() {
  const { isLoading, productList } = useMainPage();

  if (isLoading) return <Spinner />;

  return <ProductCardGrid productList={productList} />;
}

export default MainPage;
