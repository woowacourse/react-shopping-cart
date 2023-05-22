import { useRecoilValue } from 'recoil';

import type { CartItemType, UpdateCartItem } from '@Types/index';

import cartItemsAmountState from '@Selector/cartItemsAmountState';

import * as S from './style';
import CartItem from '../CartItem';

type ShoppingListProps = {
  cartItems: CartItemType[] | null;
  isLoading: boolean;
  updateCartItem: UpdateCartItem;
};

function CartItems({ cartItems, isLoading, updateCartItem }: ShoppingListProps) {
  const cartItemsAmount = useRecoilValue(cartItemsAmountState);

  return (
    <S.Container>
      <S.ShoppingListLayout>
        {isLoading &&
          Array.from({ length: Number(cartItemsAmount) }, (_, index) => (
            <CartItem key={index} isLoading={isLoading} cartId={index} updateCartItem={updateCartItem} />
          ))}
        {!isLoading &&
          cartItems?.map((item) => (
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
