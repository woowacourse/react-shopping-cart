import { CartId } from '@/e_entities/cart';
import { Text } from '@/f_shared';

import { UpdateCartQuantityButton } from '../UpdateCartQuantityButton/UpdateCartQuantityButton';

import css from './CartQuantityAdjuster.module.css';

interface CartQuantityAdjusterProps {
  cartId: CartId;
  quantity: number;
}

export const CartQuantityAdjuster = ({ cartId, quantity }: CartQuantityAdjusterProps) => {
  return (
    <div className={css.root}>
      <UpdateCartQuantityButton cartId={cartId} type={'decrease'} />
      <Text tag={'span'} type={'b2'} className={css.text}>
        {quantity}
      </Text>
      <UpdateCartQuantityButton cartId={cartId} type={'increase'} />
    </div>
  );
};
