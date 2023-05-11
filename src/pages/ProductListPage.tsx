import ProductCardList from 'components/ProductCardList/ProductCardList';
import useProductsFetch from 'hooks/useProductsFetch';

const ProductListPage = () => {
  const { products } = useProductsFetch();

  return <ProductCardList products={products} />;
};

export default ProductListPage;
