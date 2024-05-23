import { CartId } from '@/e_entities/cart';
import { Button, Text } from '@/f_shared';

import css from './UpdateCartQuantityButton.module.css';

type Type = 'increase' | 'decrease';

const label: Record<Type, string> = {
  increase: '+',
  decrease: '-',
};

interface UpdateCartQuantityButtonProps {
  cartId: CartId;
  type: Type;
}

export const UpdateCartQuantityButton = ({ cartId, type }: UpdateCartQuantityButtonProps) => {
  // TODO: Add handler with state
  const handleQuantityUpdate = () => {
    cartId;
  };

  return (
    <Button className={css.root} onClick={handleQuantityUpdate}>
      <Text tag={'span'} type={'b1'} className={css.text}>
        {label[type]}
      </Text>
    </Button>
  );
};
