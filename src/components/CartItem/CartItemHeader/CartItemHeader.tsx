import { ChangeEvent } from 'react';
import { useRecoilState } from 'recoil';

import { cartItemHeader, deleteButton } from './CartItemHeader.styled';

import Checkbox from '@/components/common/Checkbox/Checkbox';
import useDeleteCartItem from '@/hooks/useDeleteCartItem';
import { checkedItemsState } from '@recoil/cartItems/atoms';

interface CartItemHeaderProps {
  cartId: number;
}

const CartItemHeader = ({ cartId }: CartItemHeaderProps) => {
  const [isChecked, setIsChecked] = useRecoilState(checkedItemsState(cartId));
  const { handleDeleteCartItem } = useDeleteCartItem(cartId);

  return (
    <div css={cartItemHeader}>
      <Checkbox
        checked={isChecked}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setIsChecked(e.target.checked)}
        htmlFor={cartId.toString()}
        label=""
      />
      <button css={deleteButton} onClick={handleDeleteCartItem}>
        삭제
      </button>
    </div>
  );
};

export default CartItemHeader;
