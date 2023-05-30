import ProductList from '../components/main/ProductList';
import { ProductListWrapper } from '../style/ContentLayout';

const MainPage = () => {
  return (
    <ProductListWrapper>
      <ProductList />
    </ProductListWrapper>
  );
};

export default MainPage;
