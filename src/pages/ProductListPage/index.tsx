import styled from 'styled-components';
import ProductList from './ProductList';

function ProductListPage() {
  return (
    <Container>
      <ProductList />
    </Container>
  );
}

export default ProductListPage;

const Container = styled.div`
  width: 70%;
  margin: auto;
`;
