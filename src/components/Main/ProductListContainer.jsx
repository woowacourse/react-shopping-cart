import styled from 'styled-components';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Product from 'components/Main/Product';
import { loadCarts, loadProducts } from 'store/actions';

function ProductListContainer() {
  const { products } = useSelector((state) => state.products);
  const { carts } = useSelector((state) => state.carts);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadCarts());
    dispatch(loadProducts());
  }, []);

  return (
    <Styled.ProductListContainer>
      {products?.map(({ id, src, title, price }) => (
        <Product
          key={id}
          id={id}
          src={src}
          title={title}
          price={price}
          isStored={carts?.some((cart) => cart.id === id)}
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
