import { CartItem } from '@appTypes/shoppingCart';
import { CountButton } from '@components/common';
import { useCartItemQuantity } from '@hooks/shoppingCart';

import * as Styled from './CartListItemCounter.styled';

interface CartListItemCounterContainerProps {
  cartItem: CartItem;
}

const CartListItemCounter: React.FC<CartListItemCounterContainerProps> = ({ cartItem }) => {
  const { quantity, onUpdateCartItemCount } = useCartItemQuantity(cartItem.id);

  return (
    <Styled.CartListItemCounterWrapper>
      <CountButton onClick={() => onUpdateCartItemCount('minus')} sign="minus" />
      <span>{quantity}</span>
      <CountButton onClick={() => onUpdateCartItemCount('plus')} sign="plus" />
    </Styled.CartListItemCounterWrapper>
  );
};

export default CartListItemCounter;
