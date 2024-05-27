import CartItemContent from './CartItemContent';
import CartItemHeader from './CartItemHeader/CartItemHeader';
import { itemWrapper } from '../styles/item';

import { CartItemProps } from '@/types/cartItem';

interface Props {
  item: CartItemProps;
}

const CartItem = ({ item }: Props) => {
  return (
    <li css={itemWrapper}>
      <CartItemHeader cartId={item.id} />
      <CartItemContent item={item} />
    </li>
  );
};

export default CartItem;
