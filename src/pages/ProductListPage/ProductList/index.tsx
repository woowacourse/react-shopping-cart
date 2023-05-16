import SkeletonProductItem from '@Components/ProductItem/Skeleton';
import ProductItem from '@Components/ProductItem/index';

import { Product } from '@Types/index';

import useFetch from '@Hooks/useFetch';

import { MOCK_DATA_URL } from '@Constants/index';

import * as S from './style';

function ProductList() {
  const { data, isLoading } = useFetch<Product[]>(MOCK_DATA_URL);

  return (
    <S.ProductListContainer>
      {isLoading && Array.from({ length: 12 }, (_, index) => <SkeletonProductItem key={index} />)}
      {!isLoading && data && data.map((data) => <ProductItem product={data} key={data.id} />)}
    </S.ProductListContainer>
  );
}

export default ProductList;
