import ShoppingItem from '@Components/ShoppingItem';
import mockData from '../../../mockData.json';

import * as S from './style';
import useShoppingBasket from '@Hooks/useShoppingBasket';

function ProductList() {
  const { updateShoppingBasket, getQuantity } = useShoppingBasket();

  return (
    <S.ProductListContainer>
      {mockData.map((data) => {
        return (
          <ShoppingItem
            product={data}
            key={data.id}
            updateShoppingBasket={updateShoppingBasket}
            quantity={getQuantity(data.id)}
          />
        );
      })}
    </S.ProductListContainer>
  );
}

export default ProductList;
