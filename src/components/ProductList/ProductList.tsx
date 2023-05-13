import { Product } from '../../types/Product';
import useFetch from '../../hooks/useFetch';

import { StyledProductList } from './ProductList.styled';
import ProductItem from '../ProductItem/ProductItem';

const ProductList = () => {
  const productList = useFetch<Product[]>('./mockData.json', []);

  return (
    <StyledProductList>
      {productList.map(data => (
        <ProductItem key={data.id} product={{ ...data }} />
      ))}
    </StyledProductList>
  );
};

export default ProductList;
