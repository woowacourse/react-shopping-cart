import useShoppingCart from '@Hooks/useShoppingCart';

import * as S from './style';
import ShoppingItem from '../ShoppingItem';

function ShoppingList() {
  const { shoppingCart, status } = useShoppingCart();

  return (
    <S.Container>
      {status === 'error' && <div>오류</div>}
      <S.ShoppingListLayout>
        {shoppingCart &&
          shoppingCart.map((item) => <ShoppingItem cartId={item.id} product={item.product} key={item.product.id} />)}
      </S.ShoppingListLayout>
    </S.Container>
  );
}

export default ShoppingList;
