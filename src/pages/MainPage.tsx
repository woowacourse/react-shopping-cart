import ProductList from '../components/main/ProductList';
import useNavigatePage from '../hooks/useNavigatePage';
import { ProductListWrapper } from '../style/ContentLayout';
import Header from '../components/@common/Header';

const MainPage = () => {
  const { goCart } = useNavigatePage();

  return (
    <>
      <Header title="STORE" onClickCartButton={goCart} />
      <ProductListWrapper>
        <ProductList />
      </ProductListWrapper>
    </>
  );
};

export default MainPage;
