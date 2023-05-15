import ProductCardList from 'components/ProductCardList/ProductCardList';
import useFetch from 'hooks/useFetch';
import { getProducts } from 'apis/products';
import { Product } from 'types/product';

const ProductListPage = () => {
  const { data: products } = useFetch<Product[]>(getProducts);

  return <ProductCardList products={products ?? []} />;
};

export default ProductListPage;
