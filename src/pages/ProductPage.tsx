import ProductCardList from '../components/ProductCardList';
import useLocalCart from '../hooks/useLocalCart';

const ProductPage = () => {
  useLocalCart();

  return (
    <>
      <ProductCardList />
    </>
  );
};

export default ProductPage;
