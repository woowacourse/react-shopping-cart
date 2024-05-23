import { ProductId } from '@/e_entities/product';
import { Button, Text } from '@/f_shared';

import css from './UpdateProductQuantityButton.module.css';

type Type = 'increase' | 'decrease';

const label: Record<Type, string> = {
  increase: '+',
  decrease: '-',
};

interface UpdateProductQuantityButtonProps {
  productId: ProductId;
  type: Type;
}

export const UpdateProductQuantityButton = ({ productId, type }: UpdateProductQuantityButtonProps) => {
  // TODO: Add handler with state
  const handleQuantityUpdate = () => {
    productId;
  };

  return (
    <Button className={css.root} onClick={handleQuantityUpdate}>
      <Text tag={'span'} type={'b1'} className={css.text}>
        {label[type]}
      </Text>
    </Button>
  );
};
