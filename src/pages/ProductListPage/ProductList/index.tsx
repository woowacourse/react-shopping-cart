import SkeletonProductItem from '@Components/ProductItem/Skeleton';
import ProductItem from '@Components/ProductItem/index';

import { Product } from '@Types/index';

import useFetch from '@Hooks/useFetch';

import { ERROR, MOCK_DATA_URL } from '@Constants/index';

import * as S from './style';
import ErrorContainer from '../ErrorContainer';

function ProductList() {
  const { data, isLoading, currentHttpStatus } = useFetch<Product[]>(MOCK_DATA_URL);

  if (!isLoading && !data) {
    return <ErrorContainer error={currentHttpStatus} />;
  }

  if (!isLoading && data?.length === 0) {
    return <ErrorContainer error={ERROR.dataEmpty} />;
  }

  return (
    <S.ProductListContainer>
      {isLoading && Array.from({ length: 12 }, (_, index) => <SkeletonProductItem key={index} />)}
      {!isLoading && data && data.map((data) => <ProductItem product={data} key={data.id} />)}
    </S.ProductListContainer>
  );
}

export default ProductList;
