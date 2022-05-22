import { getProduct } from '@/api/product';

import Loading from '@/components/common/Loading/Loading';
import ProductDetailCard from '@/components/product/ProductDetailCard/ProductDetailCard';
import { ProductType } from '@/domain/product';

import { useThunkFetch } from '@/hooks/useFecth';

import { fetchGetCartAsync } from '@/store/cart/action';
import { useEffect, useState } from 'react';
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

  const [{ isLoading, product }, setProduct] = useState<{
    isLoading: boolean;
    product: ProductType | null;
  }>({
    isLoading: false,
    product: null,
  });

  useEffect(() => {
    const fetch = async () => {
      setProduct(prev => ({ ...prev, isLoading: true }));
      try {
        const { product } = await getProduct(productId);
        setProduct(prev => ({ ...prev, isLoading: false, product }));
      } catch ({ message }) {
        setProduct(prev => ({ ...prev, isLoading: false }));
      }
    };
    fetch();
  }, []);

  if (isLoading || isCartLoading) {
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
