import { OrderId } from '@/e_entities/product';
import { Text } from '@/f_shared';

import { UpdateProductQuantityButton } from '../UpdateProductQuantityButton/UpdateProductQuantityButton';

import css from './ProductQuantityAdjuster.module.css';

interface ProductQuantityAdjusterProps {
  orderId: OrderId;
  quantity: number;
}

export const ProductQuantityAdjuster = ({ orderId, quantity }: ProductQuantityAdjusterProps) => {
  return (
    <div className={css.root}>
      <UpdateProductQuantityButton orderId={orderId} type={'decrease'} />
      <Text tag={'span'} type={'b2'} className={css.text}>
        {quantity}
      </Text>
      <UpdateProductQuantityButton orderId={orderId} type={'increase'} />
    </div>
  );
};
