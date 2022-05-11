import styled from 'styled-components';
import Product from './Product';
import { SERVER_URL } from '../../constants';
import useAxios from '../../hooks/useAxios';

function ProductListContainer() {
  const [products, error, loading] = useAxios({
    url: `${SERVER_URL}/products`,
  });

  return (
    <Styled.ProductListContainer>
      {loading && <h1>Loading...</h1>}
      {error && <h1>{error.message}</h1>}
      {products?.map(({ id, src, title, price }) => (
        <Product key={id} id={id} src={src} title={title} price={price} />
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
