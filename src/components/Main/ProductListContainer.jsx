import styled from 'styled-components';
import { useSelector } from 'react-redux';
import Product from './Product';

function ProductListContainer() {
  const {
    products,
    isLoading: isProductsLoading,
    error: productsError,
  } = useSelector((state) => state.productsReducer);
  const {
    carts,
    isLoading: isCartsLoading,
    error: cartsError,
  } = useSelector((state) => state.cartsReducer);

  return (
    <Styled.ProductListContainer>
      {(isProductsLoading || isCartsLoading) && <h1>로딩 중...</h1>}
      {(productsError || cartsError) && (
        <h1>상품 목록을 불러오던 중 에러가 발생했습니다.</h1>
      )}
      {products?.map(({ id, src, title, price }) => (
        <Product
          key={id}
          id={id}
          src={src}
          title={title}
          price={price}
          isStored={carts.some((cart) => cart.id === id)}
        />
      ))}
    </Styled.ProductListContainer>
  );
}

const Styled = {
  ProductListContainer: styled.section`
    display: flex;
    justify-content: center;

    flex-wrap: wrap;
    gap: 20px;
    padding: 60px 240px;
  `,
};

export default ProductListContainer;
