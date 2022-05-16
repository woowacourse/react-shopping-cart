import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProductList } from 'actions/products';

import StatusMessage from 'components/@common/StatusMessage';
import ProductItem from 'components/ProductItem';
import Layout from 'components/Layout';
import useAsyncContainer from 'hooks/useAsyncContainer';

import * as Styled from './styles';

export function ProductList() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductList());
  }, []);

  const {
    content: productList,
    isLoading,
    error: errorMessage,
  } = useSelector((state) => state.products.products);

  const AsyncContainer = useAsyncContainer({
    isLoading,
    isError: !!errorMessage,
    isContentLoaded: productList.length > 0,
  });

  return (
    <Layout>
      <AsyncContainer
        loadingFallback={
          <StatusMessage status="loading">상품 목록을 불러오고 있습니다.</StatusMessage>
        }
        errorFallback={<StatusMessage status="error">{errorMessage}</StatusMessage>}
      >
        <Styled.ProductListWrapper>
          {productList &&
            productList.map(({ id, name, goodsPrice, listImage }) => (
              <ProductItem key={id} id={id} image={listImage} name={name} price={goodsPrice} />
            ))}
        </Styled.ProductListWrapper>
      </AsyncContainer>
    </Layout>
  );
}
export default ProductList;
