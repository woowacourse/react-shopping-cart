import ShoppingItem from '@Components/ShoppingItem';

import { Product } from '@Types/index';
import * as S from './style';
import useFetch from '@Hooks/useFetch';

function ProductList() {
  const { data, isLoading } = useFetch<Product[]>('data/mockData.json');
  console.log(isLoading);

  return (
    <S.ProductListContainer>
      {data && data.map((data) => <ShoppingItem product={data} key={data.id} isLoading={isLoading} />)}
      {isLoading && new Array(12).fill(undefined).map((_, index) => <ShoppingItem key={index} isLoading={isLoading} />)}
    </S.ProductListContainer>
  );
}

export default ProductList;
