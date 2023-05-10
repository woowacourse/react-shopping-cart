import ShoppingItem from '@Components/ShoppingItem';
import mockData from '../../../mockData.json';

import * as S from './style';

function ProductList() {
  return (
    <S.ProductListContainer>
      {mockData.map((data) => {
        return <ShoppingItem product={data} key={data.id} />;
      })}
    </S.ProductListContainer>
  );
}

export default ProductList;
