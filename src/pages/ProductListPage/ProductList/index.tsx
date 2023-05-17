import warning from '@Asset/warning.png';
import SkeletonProductItem from '@Components/ProductItem/Skeleton';
import ProductItem from '@Components/ProductItem/index';

import { Product } from '@Types/index';

import useFetch from '@Hooks/useFetch';

import { MOCK_DATA_URL } from '@Constants/index';

import * as S from './style';
import { ErrorImg } from '../../../styles/common/ErrorImg';
import { ErrorMessage } from '../../../styles/common/ErrorMessage';

function ProductList() {
  const { data, isLoading, currentErrorMessage } = useFetch<Product[]>(MOCK_DATA_URL);

  if (!isLoading && !data) {
    return (
      <S.ProductListErrorContainer>
        <ErrorImg src={warning} alt="경고 이미지" />
        <ErrorMessage>{currentErrorMessage}</ErrorMessage>
      </S.ProductListErrorContainer>
    );
  }

  return (
    <S.ProductListContainer>
      {isLoading && Array.from({ length: 12 }, (_, index) => <SkeletonProductItem key={index} />)}
      {!isLoading && data && data.map((data) => <ProductItem product={data} key={data.id} />)}
    </S.ProductListContainer>
  );
}

export default ProductList;
