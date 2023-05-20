  import styled from 'styled-components';
  import useFetch from '@hooks/useFetch';
  import { ProductInformation } from '@type/types';
  import ProductItem from './ProductItem';

  const ProductList = () => {
    const { data, isLoading } = useFetch<ProductInformation[]>('/products', {
      method: 'GET',
    });

    if (!data) return null;
    return (
      <Container>
        {isLoading ? "로딩 중..." :  data.map((product) => (
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
