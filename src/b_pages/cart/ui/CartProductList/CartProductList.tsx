import { BaseProductList } from '@/c_widgets/BaseProductList';
import { CheckCartButton, DeleteCartButton, CartQuantityAdjuster } from '@/d_features/cart';
import { CheckAllCartButton } from '@/d_features/cart/ui/CheckAllCartButton/CheckAllCartButton';
import { Cart } from '@/e_entities/cart';

import css from './CartProductList.module.css';

interface CartProductListProps {
  carts: Cart[];
}

export const CartProductList = ({ carts }: CartProductListProps) => {
  return (
    <div className={css.root}>
      <CheckAllCartButton />
      <BaseProductList
        carts={carts}
        cardLeftActionSlot={(cartId) => <CheckCartButton cartId={cartId} />}
        cardRightActionSlot={(cartId) => <DeleteCartButton cartId={cartId} />}
        cardCounterSlot={(cartId, quantity) => <CartQuantityAdjuster cartId={cartId} quantity={quantity} />}
      />
    </div>
  );
};
