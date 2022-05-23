import styled from 'styled-components';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Product from 'components/Main/Product';
import { loadCarts, cartsActionCreators } from 'store/carts';
import { loadProducts } from 'store/products';

function ProductListPage() {
  const { products, loading, productsError } = useSelector(
    (state) => state.products,
  );
  const { carts, cartsError } = useSelector((state) => state.carts);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadCarts());
    dispatch(loadProducts());

    return () => {
      dispatch(loadCarts(cartsActionCreators.cleanError()));
    };
  }, []);

  // useEffect(() => {
  //   if (cartsError) {
  //     alert(cartsError);
  //   }
  // }, [cartsError]);

  return (
    <Styled.ProductListPage>
      {loading && <h2>Loading...</h2>}
      {productsError && <h2>{productsError}</h2>}
      {!loading && !productsError && products?.length === 0 ? (
        <h2>상품이 없습니다.</h2>
      ) : (
        products?.map(({ id, src, title, price }) => (
          <Product
            key={id}
            id={id}
            src={src}
            title={title}
            price={price}
            isStored={carts?.some((cart) => cart.id === id)}
          />
        ))
      )}
    </Styled.ProductListPage>
  );
}

const Styled = {
  ProductListPage: styled.section`
    display: flex;
    justify-content: center;

    flex-wrap: wrap;
    gap: 20px;
    padding: 60px 240px;
  `,
};

export default ProductListPage;
