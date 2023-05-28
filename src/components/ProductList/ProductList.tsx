import * as styled from './ProductList.styled';

import { useQuery } from '../../hooks/useQuery';
import { useApiBaseUrlValue } from '../../recoils/recoilApiBaseUrl';

import { Skeleton } from './Skeleton/Skeleton';
import { Product } from '../Product/Product';

import { ProductType as IProduct } from '../../types';
import { FETCH_URL, SKELETON_LENGTH } from '../../constants';

export const ProductList = () => {
  const baseUrl = useApiBaseUrlValue();
  const { data: products, loading } = useQuery<IProduct[]>(baseUrl + FETCH_URL.PRODUCTS);

  return (
    <styled.Wrapper>
      <styled.TotalProductLength>총 {products?.length || '?'} 개의 상품</styled.TotalProductLength>
      <styled.ProductList>
        {loading
          ? Array.from({ length: SKELETON_LENGTH }).map((_, i) => <Skeleton key={i} />)
          : products?.map((product) => <Product key={product.id} item={product} />)}
      </styled.ProductList>
    </styled.Wrapper>
  );
};
