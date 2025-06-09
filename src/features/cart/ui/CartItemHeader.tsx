/** @jsxImportSource @emotion/react */

import * as S from './CartItemHeader.styles';
import Button from '../../../shared/ui/Button';
import SelectInput from '../../../shared/ui/SelectInput';
import { CartItem } from '../types/cart';
import { useCartItemActions } from '../hooks/useCartItemActions';

interface CartItemHeaderProps {
  cartItem: CartItem;
}

export default function CartItemHeader({ cartItem }: CartItemHeaderProps) {
  const { isSelected, handleSelectedCartItemsItemUpdate, handleCartItemDelete } = useCartItemActions(cartItem);

  return (
    <S.CartItemHeader>
      <SelectInput onChange={handleSelectedCartItemsItemUpdate} checked={isSelected} />
      <Button title="삭제" css={S.deleteButtonCSS} onClick={handleCartItemDelete} />
    </S.CartItemHeader>
  );
}
