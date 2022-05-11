import styled from 'styled-components';
import { useSelector } from 'react-redux';
import Product from './Product';

function ProductListContainer() {
  const { products, carts } = useSelector((state) => state.productsReducer);

  return (
    <Styled.ProductListContainer>
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
