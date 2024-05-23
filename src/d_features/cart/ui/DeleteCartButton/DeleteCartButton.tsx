import { CartId } from '@/e_entities/cart';
import { Button, Text } from '@/f_shared';

import css from './DeleteCartButton.module.css';

interface DeleteCartButton {
  cartId: CartId;
}

// TODO: Add handler with state
export const DeleteCartButton = ({ cartId }: DeleteCartButton) => {
  cartId; // temp

  return (
    <Button className={css.root} onClick={() => {}}>
      <Text tag='span' type='b2'>
        삭제
      </Text>
    </Button>
  );
};
