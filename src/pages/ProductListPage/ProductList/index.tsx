import ShoppingItem from '@Components/ShoppingItem';

import { Product } from '@Types/index';
import * as S from './style';
import useFetch from '@Hooks/useFetch';

function ProductList() {
  const { data, isLoading } = useFetch<Product[]>('data/mockData.json');

  return (
    <S.ProductListContainer>
      {data &&
        data.map((data) => {
          return <ShoppingItem product={data} key={data.id} isLoading={isLoading} />;
        })}
    </S.ProductListContainer>
  );
}

export default ProductList;
