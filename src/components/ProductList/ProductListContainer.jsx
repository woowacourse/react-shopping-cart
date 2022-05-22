import { useSelector } from 'react-redux';

import styled from 'styled-components';
import { Flex } from '../shared/basics';

import ProductItem from './ProductItem';

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
      {isLoading && <h1>로딩 중...</h1>}
      {isError && <h1>상품 목록을 불러오던 중 에러가 발생했습니다.</h1>}
      {!isLoading &&
        !isError &&
        products?.map(({ id, src, title, price }) => (
          <ProductItem
            key={id}
            id={id}
            src={src}
            title={title}
            price={price}
            isStored={carts.some((cart) => cart.id === id)}
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
