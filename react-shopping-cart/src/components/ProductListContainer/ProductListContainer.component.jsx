import styled from 'styled-components';
import ProductListItem from 'components/ProductListItem/ProductListItem.component';

const ProductListBox = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 45px;
`;

function ProductListContainer({ productList }) {
  return (
    <ProductListBox>
      {productList.map(itemInfo => (
        <ProductListItem key={itemInfo.id} {...itemInfo} />
      ))}
    </ProductListBox>
  );
}

export default ProductListContainer;
