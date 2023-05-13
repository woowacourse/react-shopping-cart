import * as Styled from './ProductList.styled';
import ProductItem from '../ProductItem/ProductItem';

import { Product } from '../../types/Product';
import useFetchData from '../../hooks/useFetchData';

const ProductList = () => {
  const productList = useFetchData<Product[]>('./mockData.json', []);

  return (
    <Styled.ProductList>
      {productList.map(data => (
        <ProductItem key={data.id} product={{ ...data }} />
      ))}
    </Styled.ProductList>
  );
};

export default ProductList;
