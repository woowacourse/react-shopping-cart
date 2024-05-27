import { BaseProductList } from '@/c_widgets/BaseProductList';
import { CheckCartItemButton, DeleteCartItemButton, CartItemQuantityAdjuster } from '@/d_features/cart';
import { CheckAllCartItemsButton } from '@/d_features/cart/ui/CheckAllCartItemsButton/CheckAllCartItemsButton';
import { CartItem } from '@/f_shared';

import css from './CartProductList.module.css';

interface CartItemListProps {
  cartItems: CartItem[];
}

export const CartItemList = ({ cartItems }: CartItemListProps) => {
  return (
    <div className={css.root}>
      <CheckAllCartItemsButton />
      <BaseProductList
        cartItems={cartItems}
        cardLeftActionSlot={(cartItemId) => <CheckCartItemButton cartItemId={cartItemId} />}
        cardRightActionSlot={(cartItemId) => <DeleteCartItemButton cartItemId={cartItemId} />}
        cardCounterSlot={(cartItemId, quantity) => (
          <CartItemQuantityAdjuster cartItemId={cartItemId} quantity={quantity} />
        )}
      />
    </div>
  );
};
