import { Text } from '../../../../f_shared/index';

import css from './OrderItemCardCounter.module.css';

interface OrderItemCardCounterProps {
  quantity: number;
}

export const OrderItemCardCounter = ({ quantity }: OrderItemCardCounterProps) => {
  return (
    <div className={css.root}>
      <Text type={'b2'}>{`${quantity}개`}</Text>
    </div>
  );
};
