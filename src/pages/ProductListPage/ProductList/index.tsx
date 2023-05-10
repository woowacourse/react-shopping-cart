import ShoppingItem from '@Components/ShoppingItem';
import mockData from '../../../mockData.json';
import styled from 'styled-components';

function ProductList() {
  return (
    <ProductListContainer>
      {mockData.map((data) => {
        return <ShoppingItem {...data} key={data.id} />;
      })}
    </ProductListContainer>
  );
}

export default ProductList;

const ProductListContainer = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 60px;
  row-gap: 80px;
  margin-bottom: 160px;
`;
