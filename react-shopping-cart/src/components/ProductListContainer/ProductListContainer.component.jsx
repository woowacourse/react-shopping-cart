import styled from 'styled-components';
import ProductListItem from 'components/ProductListItem/ProductListItem.component';
import RESPONSIVE_SIZE from 'constants/responsiveSize';

const ProductListBox = styled.div`
  display: grid;
  gap: 45px;

  grid-template-columns: repeat(4, 1fr);

  @media (max-width: ${RESPONSIVE_SIZE.EXTRA_LARGE}) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: ${RESPONSIVE_SIZE.LARGE}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${RESPONSIVE_SIZE.MEDIUM}) {
    grid-template-columns: repeat(1, 1fr);
  }
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
