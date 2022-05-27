import Error from 'components/@shared/Error/Error.component';

import ProductListBox from 'components/ProductListBox/ProductListBox.component';
import ProductListItem from 'components/ProductListItem/ProductListItem.component';

function ProductListContainer({ data }) {
  return (
    <main>
      <h1 hidden>상품 리스트</h1>
      {Array.isArray(data) && data.length === 0 ? (
        <Error>상품이 존재하지 않습니다</Error>
      ) : (
        <ProductListBox as="ul">
          {data.map(itemInfo => (
            <li key={itemInfo.id}>
              <ProductListItem {...itemInfo} />
            </li>
          ))}
        </ProductListBox>
      )}
    </main>
  );
}

export default ProductListContainer;
