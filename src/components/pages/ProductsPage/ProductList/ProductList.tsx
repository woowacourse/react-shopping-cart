import * as Styled from './ProductList.styled';
import ProductItem from '../ProductItem/ProductItem';

import { Product } from '../../../../types/Product';
import useFetchData from '../../../../hooks/useFetchData';
import ErrorPage from '../../ErrorPage/ErrorPage';
import LoadingPage from '../../LoadingPage/LoadingPage';

const ProductList = () => {
  const { data: productList, status } = useFetchData<Product[]>('./mockData.json', []);

  if (status === 0) {
    return <LoadingPage />;
  }

  if (status < 200 || status > 299) {
    return <ErrorPage />;
  }

  return (
    <Styled.ProductList>
      {productList.map(data => (
        <ProductItem key={data.id} product={{ ...data }} />
      ))}
    </Styled.ProductList>
  );
};

export default ProductList;
