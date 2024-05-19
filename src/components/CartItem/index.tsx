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
  display: flex;
  flex-direction: column;
  gap: 12px;
  border-top: 1px solid #0000001a;
  padding-top: 10px;
`;
