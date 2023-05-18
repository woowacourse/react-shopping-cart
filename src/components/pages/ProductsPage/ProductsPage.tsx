import * as Styled from './ProductsPage.styled';
import ProductList from './ProductList/ProductList';
import LoadingPage from '../LoadingPage/LoadingPage';
import useFetchData from '../../../hooks/useFetchData';
import { Product } from '../../../types/Product';

const ProductsPage = () => {
  const { data } = useFetchData<Product[]>('/products');

  return (
    <Styled.ProductsPage>
      {data ? <ProductList list={data} /> : <LoadingPage />}
    </Styled.ProductsPage>
  );
};

export default ProductsPage;
