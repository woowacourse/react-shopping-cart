import Header from '../components/common/Header';
import ProductList from '../components/main/ProductList';
import useNavigatePage from '../hooks/useNavigatePage';

const MainPage = () => {
  const { goCart } = useNavigatePage();

  return (
    <>
      <Header title="STORE" onClickCartButton={goCart} />
      <ProductList />
    </>
  );
};

export default MainPage;
