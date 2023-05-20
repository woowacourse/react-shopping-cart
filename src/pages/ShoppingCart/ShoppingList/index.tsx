import { ShoppingCartProduct, UpdateShoppingCart } from '@Types/index';

import * as S from './style';
import ShoppingItem from '../ShoppingItem';

type ShoppingListProps = {
  cartItems: ShoppingCartProduct[] | null;
  isLoading: boolean;
  updateShoppingCart: UpdateShoppingCart;
};

function ShoppingList({ cartItems, isLoading, updateShoppingCart }: ShoppingListProps) {
  return (
    <S.Container>
      <S.ShoppingListLayout>
        {isLoading &&
          Array.from({ length: 6 }, (_, index) => (
            <ShoppingItem key={index} isLoading={isLoading} cartId={index} updateShoppingCart={updateShoppingCart} />
          ))}
        {cartItems &&
          cartItems.map((item) => (
            <ShoppingItem
              cartId={item.id}
              product={item.product}
              key={item.product.id}
              updateShoppingCart={updateShoppingCart}
              isLoading={isLoading}
            />
          ))}
      </S.ShoppingListLayout>
    </S.Container>
  );
}

export default ShoppingList;
