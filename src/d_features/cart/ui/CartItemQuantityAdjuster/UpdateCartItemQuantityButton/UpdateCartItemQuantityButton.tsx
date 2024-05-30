import { Button, Text } from '@/f_shared';

import { useUpdateCartQuantity } from '../../../model/quantity';

import css from './UpdateCartItemQuantityButton.module.css';

type Type = 'increase' | 'decrease';

const label: Record<Type, string> = {
  increase: '+',
  decrease: '-',
};

interface UpdateCartItemQuantityButtonProps {
  cartItemId: CartItemId;
  type: Type;
}

export const UpdateCartItemQuantityButton = ({ cartItemId, type }: UpdateCartItemQuantityButtonProps) => {
  const handleUpdateQuantity = useUpdateCartQuantity(cartItemId, type);

  return (
    <Button className={css.root} onClick={handleUpdateQuantity}>
      <Text tag={'span'} className={css.text}>
        {label[type]}
      </Text>
    </Button>
  );
};
