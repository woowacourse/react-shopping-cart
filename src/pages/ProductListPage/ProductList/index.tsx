import ProductItem from '@Components/ProductItem';

import { Product } from '@Types/index';
import * as S from './style';
import useFetch from '@Hooks/useFetch';

function ProductList() {
  const { data, isLoading } = useFetch<Product[]>('data/mockData.json');

  return (
    <S.ProductListContainer>
      {data && data.map((data) => <ProductItem product={data} key={data.id} isLoading={isLoading} />)}
      {isLoading && new Array(12).fill(undefined).map((_, index) => <ProductItem key={index} isLoading={isLoading} />)}
    </S.ProductListContainer>
  );
}

export default ProductList;
