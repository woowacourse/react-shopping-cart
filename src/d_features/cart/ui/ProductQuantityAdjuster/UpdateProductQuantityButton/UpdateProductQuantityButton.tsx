import { OrderId } from '@/e_entities/product';
import { Button, Text } from '@/f_shared';

import css from './UpdateProductQuantityButton.module.css';

type Type = 'increase' | 'decrease';

const label: Record<Type, string> = {
  increase: '+',
  decrease: '-',
};

interface UpdateProductQuantityButtonProps {
  orderId: OrderId;
  type: Type;
}

export const UpdateProductQuantityButton = ({ orderId, type }: UpdateProductQuantityButtonProps) => {
  // TODO: Add handler with state
  const handleQuantityUpdate = () => {
    orderId;
  };

  return (
    <Button className={css.root} onClick={handleQuantityUpdate}>
      <Text tag={'span'} type={'b1'} className={css.text}>
        {label[type]}
      </Text>
    </Button>
  );
};
