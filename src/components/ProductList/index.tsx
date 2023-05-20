import styled from 'styled-components';
import useFetch from '@hooks/useFetch';
import ProductItem from './ProductItem';

const ProductList = () => {
  const { data } = useFetch('/products', { method: 'GET' });
  const productsId: number[] = [];

  data.forEach((element: {}, index: number) => {
    productsId.push(index);
  });
  return (
    <Container>
      {data.map((product, index) => (
        <ProductItem product={product} key={productsId[index]} />
      ))}
    </Container>
  );
};

const Container = styled.div`
  display: grid;

  grid-template-columns: repeat(4, 1fr);
  gap: 80px 46px;

  @media (max-width: 1300px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 1023px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 679px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export default ProductList;
