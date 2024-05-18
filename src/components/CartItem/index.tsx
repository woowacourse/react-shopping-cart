import { css } from '@emotion/react';

import CartItemHeaderSection from './CartItemHeaderSection';
import CartItemMainSection from './CartItemMainSection';

import { CartItemProps } from '@/types/cartItem';

interface Props {
  item: CartItemProps;
}

const CartItem = ({ item }: Props) => {
  return (
    <li css={cartItemContainer}>
      <CartItemHeaderSection cartId={item.id} productName={item.product.name} />
      <CartItemMainSection item={item} />
    </li>
  );
};

export default CartItem;

const cartItemContainer = css`
  border-top: 1px solid #0000001a;
  padding: 10px 0;
`;
