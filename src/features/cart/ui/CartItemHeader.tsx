/** @jsxImportSource @emotion/react */

import * as S from './CartItemHeader.styles';
import Button from '../../../shared/ui/Button';
import SelectInput from '../../../shared/ui/SelectInput';
import { useSelectedCartItemsContext } from '../context/useSelectedCartItemsContext';
import { useCartItemsContext } from '../context/useCartItemsContext';
import { deleteCartItem } from '../api/deleteCartItem';
import { CartItem } from '../types/cart';

interface CartItemHeaderProps {
  cartItem: CartItem;
}

export default function CartItemHeader({ cartItem }: CartItemHeaderProps) {
  const { SelectedCartItems, addSelectedCartItem, removeSelectedCartItem } = useSelectedCartItemsContext();
  const { fetchCartItems } = useCartItemsContext();

  const handleSelectedCartItemsItemUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    if (!isChecked) {
      removeSelectedCartItem(cartItem);
      return;
    }
    addSelectedCartItem(cartItem, cartItem.quantity);
  };

  const isSelected = SelectedCartItems.find((item) => item.id === cartItem.id) !== undefined;
  const handleCartItemDelete = async () => {
    try {
      await deleteCartItem(cartItem.id);
      removeSelectedCartItem(cartItem);
      await fetchCartItems();
    } catch (error) {
      if (error instanceof Error) {
        console.error('장바구니 아이템 삭제 실패:', error.message);
        alert('장바구니 아이템 삭제에 실패했습니다. 다시 시도해주세요.');
      }
    }
  };

  return (
    <S.CartItemHeader>
      <SelectInput onChange={handleSelectedCartItemsItemUpdate} checked={isSelected} />
      <Button title="삭제" css={S.deleteButtonCSS} onClick={handleCartItemDelete} />
    </S.CartItemHeader>
  );
}
