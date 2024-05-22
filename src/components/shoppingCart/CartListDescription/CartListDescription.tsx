import { CartItem } from '@appTypes/shoppingCart';
import { CartItemInfo } from '@components/common';

import CartItemCountButtonGroup from '../CartItemCountButtonGroup/CartItemCountButtonGroup';

import * as Styled from './CartListDescription.styled';

interface CartListDescriptionContainerProps {
  cartItem: CartItem;
}

const CartListDescription: React.FC<CartListDescriptionContainerProps> = ({ cartItem }) => {
  return (
    <Styled.CartItemDescription>
      <CartItemInfo.Name cartItem={cartItem} />
      <CartItemInfo.Price cartItem={cartItem} />
      <CartItemCountButtonGroup cartItem={cartItem} />
    </Styled.CartItemDescription>
  );
};

export default CartListDescription;
