import { css } from '@emotion/react';

import CartItemInfo from './CartItemInfo';
import CartItemHeaderSection from '../CartItem/CartItemHeader';

import { CartItemProps } from '@/types/cartItem';
import { THEME } from '@constants/theme';

interface Props {
  item: CartItemProps;
  type: 'CART' | 'ORDER';
}

const CartItem = ({ item, type }: Props) => {
  return (
    <li css={cartItemWrapper}>
      {type === 'CART' && <CartItemHeaderSection cartId={item.id} />}
      <CartItemInfo item={item} type={type} />
    </li>
  );
};

export default CartItem;

const cartItemWrapper = css`
  border-top: 1px solid ${THEME.LIGHT_BLACK};
  padding: 10px 0;
`;
