import { BaseProductList } from '@/c_widgets/BaseProductList';
import { CheckCartButton, DeleteCartButton, CartQuantityAdjuster } from '@/d_features/cart';
import { Cart } from '@/e_entities/cart';

interface CartProductListProps {
  carts: Cart[];
}

export const CartProductList = ({ carts }: CartProductListProps) => {
  return (
    <BaseProductList
      carts={carts}
      cardLeftActionSlot={(cartId) => <CheckCartButton cartId={cartId} />}
      cardRightActionSlot={(cartId) => <DeleteCartButton cartId={cartId} />}
      cardCounterSlot={(cartId, quantity) => <CartQuantityAdjuster cartId={cartId} quantity={quantity} />}
    />
  );
};
