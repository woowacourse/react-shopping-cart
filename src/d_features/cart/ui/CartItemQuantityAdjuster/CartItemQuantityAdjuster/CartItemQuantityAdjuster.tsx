import { Text } from '@/f_shared';

import { UpdateCartItemQuantityButton } from '../UpdateCartItemQuantityButton/UpdateCartItemQuantityButton';

import css from './CartItemQuantityAdjuster.module.css';

interface CartItemQuantityAdjusterProps {
  cartItemId: CartItemId;
  quantity: number;
}

export const CartItemQuantityAdjuster = ({ cartItemId, quantity }: CartItemQuantityAdjusterProps) => {
  return (
    <div className={css.root}>
      <UpdateCartItemQuantityButton cartItemId={cartItemId} type={'decrease'} />
      <Text tag={'span'} type={'b2'} className={css.text}>
        {quantity}
      </Text>
      <UpdateCartItemQuantityButton cartItemId={cartItemId} type={'increase'} />
    </div>
  );
};
