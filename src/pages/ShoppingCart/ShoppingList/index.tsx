import { ShoppingCartProduct, UpdateShoppingCart } from '@Types/index';

import * as S from './style';
import ShoppingItem from '../ShoppingItem';

type ShoppingListProps = {
  cartItems: ShoppingCartProduct[];
  isLoading: boolean;
  updateShoppingCart: UpdateShoppingCart;
};

function ShoppingList({ cartItems, isLoading, updateShoppingCart }: ShoppingListProps) {
  return (
    <S.Container>
      <S.ShoppingListLayout>
        {isLoading ? (
          <div>loading</div>
        ) : (
          cartItems.map((item) => (
            <ShoppingItem
              cartId={item.id}
              product={item.product}
              key={item.product.id}
              updateShoppingCart={updateShoppingCart}
            />
          ))
        )}
      </S.ShoppingListLayout>
    </S.Container>
  );
}

export default ShoppingList;
