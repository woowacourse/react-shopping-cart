import type { CartItemType, UpdateCartItem } from '@Types/index';

import * as S from './style';
import CartItem from '../CartItem';

type ShoppingListProps = {
  cartItems: CartItemType[] | null;
  isLoading: boolean;
  updateCartItem: UpdateCartItem;
};

function CartItems({ cartItems, isLoading, updateCartItem }: ShoppingListProps) {
  return (
    <S.Container>
      <S.ShoppingListLayout>
        {isLoading &&
          Array.from({ length: 6 }, (_, index) => (
            <CartItem key={index} isLoading={isLoading} cartId={index} updateCartItem={updateCartItem} />
          ))}
        {cartItems &&
          cartItems.map((item) => (
            <CartItem
              cartId={item.id}
              product={item.product}
              key={item.product.id}
              updateCartItem={updateCartItem}
              isLoading={isLoading}
            />
          ))}
      </S.ShoppingListLayout>
    </S.Container>
  );
}

export default CartItems;
