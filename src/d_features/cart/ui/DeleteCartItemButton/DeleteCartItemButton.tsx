import { Button, Text } from '@/f_shared';

import { useDeleteCartItem } from '../../model/delete';

import css from './DeleteCartItemButton.module.css';

interface DeleteCartItemProps {
  cartItemId: CartItemId;
}

export const DeleteCartItemButton = ({ cartItemId }: DeleteCartItemProps) => {
  const handleDelete = useDeleteCartItem(cartItemId);

  return (
    <Button className={css.root} onClick={handleDelete}>
      <Text tag='span' type='c4'>
        삭제
      </Text>
    </Button>
  );
};
