import { useEffect, useState } from 'react';
import SelectInput from '../../../shared/ui/SelectInput';
import CartItemCard from './CartItemCard';
import * as S from './CartList.styles';
import { CartItem } from '../../../shared/type/cart';
import { useSelectedCartContext } from '../../../shared/context/useCartContext';
import { getCartItems } from '../api/getCartItems';

export default function CartList() {
  const { addAllCartItemsInSelected, selectedCartItems } = useSelectedCartContext();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await getCartItems();
        if (!response) return;

        setCartItems(response.content);
      } catch (error) {
        if (error instanceof Error) {
          console.error('Failed to fetch cart items:', error.message);
        }
      }
    };
    fetchCartItems();
  }, [selectedCartItems]);

  const handleAllCartItemsInSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    if (!isChecked) {
      addAllCartItemsInSelected([]);
      return;
    }
    addAllCartItemsInSelected(cartItems);
  };

  return (
    <S.CartListContainer>
      <S.AllSelectContainer>
        <SelectInput type='checkbox' onChange={handleAllCartItemsInSelected} />
        <span>전체 선택</span>
      </S.AllSelectContainer>
      <S.CartItemCardContainer>
        {cartItems.map((cartItem) => (
          <CartItemCard key={cartItem.id} cartItem={cartItem} />
        ))}
      </S.CartItemCardContainer>
    </S.CartListContainer>
  );
}
