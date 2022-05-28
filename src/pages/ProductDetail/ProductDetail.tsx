import { getProduct } from '@/api/product';

import Loading from '@/components/common/Loading/Loading';
import ProductDetailCard from '@/components/product/ProductDetailCard/ProductDetailCard';
import { useFetch, useThunkFetch } from '@/hooks/useFecth';

import { fetchGetCartAsync } from '@/store/cart/action';
import { useParams } from 'react-router';
import ErrorContainer from '../../components/common/ErrorContainer/ErrorContainer';
import PageTemplate from '../../components/common/PageTemplate/PageTemplate';

import * as Styled from './ProductDetail.style';

function ProductDetail() {
  const { productId } = useParams();

  const { isLoading: isCartLoading } = useThunkFetch({
    selector: state => state.cart,
    thunkAction: fetchGetCartAsync,
    deps: [],
  });

  const { isLoading: isProductLoading, data: product } = useFetch({
    action: () => getProduct(productId),
    deps: [],
  });

  if (isProductLoading || isCartLoading) {
    return (
      <Loading type="page" fontSize="2rem">
        👻
      </Loading>
    );
  }

  if (product === null) {
    return (
      <PageTemplate>
        <Styled.Title>상품 상세</Styled.Title>
        <ErrorContainer>🚧 잘못된 접근입니다. 🚧 </ErrorContainer>
      </PageTemplate>
    );
  }

  return (
    <PageTemplate>
      <Styled.Title>상품 상세</Styled.Title>

      <Styled.Container>
        <ProductDetailCard product={product} />
      </Styled.Container>
    </PageTemplate>
  );
}

export default ProductDetail;
