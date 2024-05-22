import { CartItem } from '@appTypes/shoppingCart';
import { CartItemInfo } from '@components/common';

import CartItemCountButtonGroup from '../CartItemCountButtonGroup/CartItemCountButtonGroup';

interface CartListDescriptionContainerProps {
  cartItem: CartItem;
}

const CartListDescription: React.FC<CartListDescriptionContainerProps> = ({ cartItem }) => {
  return (
    <CartItemInfo.Description>
      <CartItemInfo.Name cartItem={cartItem} />
      <CartItemInfo.Price cartItem={cartItem} />
      <CartItemCountButtonGroup cartItem={cartItem} />
    </CartItemInfo.Description>
  );
};

export default CartListDescription;
