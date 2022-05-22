import Error from 'components/@shared/Error/Error.component';

import ProductListBox from 'components/ProductListBox/ProductListBox.component';
import ProductListItem from 'components/ProductListItem/ProductListItem.component';

function ProductListContainer({ data }) {
  return (
    <>
      {Array.isArray(data) && data.length === 0 ? (
        <Error>상품이 존재하지 않습니다</Error>
      ) : (
        <ProductListBox>
          {data.map(itemInfo => (
            <ProductListItem key={itemInfo.id} {...itemInfo} />
          ))}
        </ProductListBox>
      )}
    </>
  );
}

export default ProductListContainer;
