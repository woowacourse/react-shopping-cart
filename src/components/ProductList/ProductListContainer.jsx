import { useSelector } from 'react-redux';

import styled from 'styled-components';
import { Flex } from 'components/shared/basics';

import ProductItem from 'components/ProductList/ProductItem';
import SkeletonProductItem from 'components/ProductList/SkeletonProductItem';

function ProductListContainer() {
  const {
    products,
    isLoading: isProductsLoading,
    error: productsError,
  } = useSelector((state) => state.products);
  const {
    carts,
    isLoading: isCartsLoading,
    error: cartsError,
  } = useSelector((state) => state.carts);

  const isLoading = isProductsLoading || isCartsLoading;
  const isError = productsError || cartsError;

  return (
    <Styled.ProductListFlexContainer justify="center" wrap="wrap" gap="25px">
      {isLoading &&
        Array.from({ length: 12 }).map((_, idx) => (
          <SkeletonProductItem key={idx} />
        ))}
      {isError && <h1>상품 목록을 불러오던 중 에러가 발생했습니다.</h1>}
      {!isLoading &&
        !isError &&
        products?.map((product) => (
          <ProductItem
            key={product.id}
            {...product}
            isStored={carts.some((cart) => cart.id === product.id)}
          />
        ))}
    </Styled.ProductListFlexContainer>
  );
}

const Styled = {
  ProductListFlexContainer: styled(Flex)`
    padding: 60px 240px;
  `,
};

export default ProductListContainer;
