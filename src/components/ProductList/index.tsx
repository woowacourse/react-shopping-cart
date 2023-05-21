import styled from 'styled-components';
import useGetFetch from '@hooks/useGetFetch';
import { ProductInformation } from '@type/types';
import ProductItem from './ProductItem';

const ProductList = () => {
  const { data, isLoading } = useGetFetch<ProductInformation[]>('/products', {
    method: 'GET',
  });

  if (isLoading) {
    return <div>로딩 중입니다...</div>;
  }

  if (!data) return null;
  return (
    <Container>
      {data.map((product) => (
        <ProductItem product={product} key={product.id} />
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
