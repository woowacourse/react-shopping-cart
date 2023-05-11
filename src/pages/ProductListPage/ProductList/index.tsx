import ProductItem from '@Components/ProductItem';

import { Product } from '@Types/index';

import useFetch from '@Hooks/useFetch';

import { MOCK_DATA_URL } from '@Constants/index';

import * as S from './style';

function ProductList() {
  const { data, isLoading } = useFetch<Product[]>(MOCK_DATA_URL);

  return (
    <S.ProductListContainer>
      {data && data.map((data) => <ProductItem product={data} key={data.id} isLoading={isLoading} />)}
      {isLoading &&
        new Array(12).fill(undefined).map((_: undefined, index) => <ProductItem key={index} isLoading={isLoading} />)}
    </S.ProductListContainer>
  );
}

export default ProductList;
