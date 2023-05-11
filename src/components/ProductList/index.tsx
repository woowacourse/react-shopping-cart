import styled from 'styled-components';
import { PRODUCT_LIST } from '../../mockData/productList';
import ProductItem from './ProductItem';

const ProductList = () => {
  return (
    <Container>
      {PRODUCT_LIST.productList.map((product) => (
        <ProductItem
          id={product.id}
          name={product.name}
          imageUrl={product.imageUrl}
          price={product.price}
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
