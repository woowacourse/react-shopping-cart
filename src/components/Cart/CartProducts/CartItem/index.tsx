import { css } from '@emotion/react';

import CartItemInfo from './CartItemInfo';
import CartItemSetting from './CartItemSetting';

import { CartItemProps } from '@/types/cartItem';

interface Props {
  item: CartItemProps;
}

const CartItem = ({ item }: Props) => {
  return (
    <li css={cartItemContainer}>
      <CartItemSetting cartId={item.id} productName={item.product.name} />
      <CartItemInfo item={item} />
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
