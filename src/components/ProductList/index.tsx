import styled from 'styled-components';
import { PRODUCT_LIST } from '../../mockData/productList';
import ProductItem from './ProductItem';

const ProductList = () => {
  return (
    <Container>
      {PRODUCT_LIST.productList.map((product) => (
        <ProductItem
          {...product}
          key={product.id}
        />
      ))}
    </Container>
  );
};

const Container = styled.div`
  display: grid;

  grid-template-columns: repeat(4, 1fr);
  gap: 80px 46px;
`;

export default ProductList;
