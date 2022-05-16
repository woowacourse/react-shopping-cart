import styled from 'styled-components';
import ProductListItem from 'components/ProductListItem/ProductListItem.component';
import Error from 'components/@shared/Error/Error.component';

const ProductListBox = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 45px;
`;

function ProductListContainer({ data, handleToggleShoppingCart, checkContainedProduct }) {
  return (
    <>
      {data.length === 0 ? (
        <Error>상품이 존재하지 않습니다</Error>
      ) : (
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
      )}
    </>
  );
}

export default ProductListContainer;
