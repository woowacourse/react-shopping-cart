import { ProductId } from '@/e_entities/product';
import { Button, Text } from '@/f_shared';

import css from './DeleteProductButton.module.css';

interface DeleteProductButton {
  productId: ProductId;
}

// TODO: Add handler with state
export const DeleteProductButton = ({ productId }: DeleteProductButton) => {
  productId; // temp

  return (
    <Button className={css.root} onClick={() => {}}>
      <Text tag='span' type='b2'>
        삭제
      </Text>
    </Button>
  );
};
