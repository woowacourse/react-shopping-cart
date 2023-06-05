import { ErrorBoundary } from 'react-error-boundary';
import * as styled from './ProductList.styled';

import { Product } from '../Product/Product';
import { FallbackRender } from '../FallbackRender/FallbackRender';

import { useFetchProducts } from '../../recoils/recoilProducts';

export const ProductList = () => {
  const products = useFetchProducts();

  return (
    <styled.Wrapper>
      <styled.TotalProductLength>총 {products.length} 개의 상품</styled.TotalProductLength>
      <styled.ProductList>
        {products.map((product) => (
          <ErrorBoundary key={product.id} fallbackRender={FallbackRender}>
            <Product item={product} />
          </ErrorBoundary>
        ))}
      </styled.ProductList>
    </styled.Wrapper>
  );
};
