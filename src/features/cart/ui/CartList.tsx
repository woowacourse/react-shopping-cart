import SelectInput from '../../../shared/ui/SelectInput';
import CartItemCard from './CartItemCard';
import * as S from './CartList.styles';
import { useCartContext } from '../../../shared/context/useCartContext';
import { useEffect } from 'react';

export default function CartList() {
  const { cartItems, selectedCartItems, addAllCartItemsInSelected } = useCartContext();

  useEffect(() => {
    if (cartItems.length === 0) return;

    addAllCartItemsInSelected(cartItems);
  }, []);

  const selectedIds = new Set(selectedCartItems.map((item) => item.id));
  const isAllSelected = cartItems.length > 0 && cartItems.every((cartItem) => selectedIds.has(cartItem.id));

  const handleAllCartItemsInSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    addAllCartItemsInSelected(isChecked ? cartItems : []);
  };

  return (
    <S.CartListContainer>
      <S.AllSelectContainer>
        <SelectInput id='select-all' type='checkbox' onChange={handleAllCartItemsInSelected} checked={isAllSelected} />
        <label htmlFor='select-all'>전체 선택</label>
      </S.AllSelectContainer>
      <S.CartItemCardContainer>
        {cartItems.map((cartItem) => (
          <CartItemCard key={cartItem.id} cartItem={cartItem} />
        ))}
      </S.CartItemCardContainer>
    </S.CartListContainer>
  );
}
