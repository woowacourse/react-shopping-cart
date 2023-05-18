import styled from 'styled-components';
import useProductList from '@hooks/useProductList';
import { device } from '@styles/theme';
import ProductItem from './ProductItem';

const ProductList = () => {
  const productList = useProductList();

  return (
    <Container>
      {productList.map((product) => (
        <ProductItem product={product} key={product.id} />
      ))}
    </Container>
  );
};

const Container = styled.div`
  display: grid;

  grid-template-columns: repeat(4, 1fr);
  gap: 80px 46px;

  @media ${device.laptopL} {
    grid-template-columns: repeat(3, 1fr);
    gap: 50px 46px;
  }

  @media ${device.laptop} {
    grid-template-columns: repeat(2, 1fr);
    gap: 40px 46px;
  }

  @media ${device.tablet} {
    grid-template-columns: repeat(1, 1fr);
    gap: 30px 46px;
  }
`;

export default ProductList;
