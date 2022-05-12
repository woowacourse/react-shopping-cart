import styled from 'styled-components';
import ProductListItem from 'components/ProductListItem/ProductListItem.component';

const ProductListBox = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 45px;
`;

function ProductListContainer({ data, handleToggleShoppingCart, checkContainedProduct }) {
  return (
    <ProductListBox>
      {data.map(itemInfo => (
        <ProductListItem
          key={itemInfo.id}
          {...itemInfo}
          isContained={checkContainedProduct(itemInfo.id)}
          handleToggleShoppingCart={handleToggleShoppingCart}
        />
      ))}
    </ProductListBox>
  );
}

export default ProductListContainer;
