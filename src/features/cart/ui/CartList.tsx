import { useEffect, useState } from 'react';
import SelectInput from '../../../shared/ui/SelectInput';
import CartItemCard from './CartItemCard';
import * as S from './CartList.styles';
import { httpClient } from '../../../shared/api/httpClient';
import { CartItem } from '../../../shared/type/cart';

interface CartItemsResponse {
  content: CartItem[];
}

export default function CartList() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await httpClient.get<CartItemsResponse>('/cart-items');
        if (!response) return;

        setCartItems(response.content);
      } catch (error) {
        if (error instanceof Error) {
          console.error('Failed to fetch cart items:', error.message);
        }
      }
    };
    fetchCartItems();
  }, []);

  return (
    <S.CartListContainer>
      <S.AllSelectContainer>
        <SelectInput type='checkbox' />
        <span>전체 선택</span>
      </S.AllSelectContainer>
      <S.CartItemCardContainer>
        {cartItems.map((cartItem) => (
          <CartItemCard key={cartItem.id} cartItem={cartItem.product} />
        ))}
      </S.CartItemCardContainer>
    </S.CartListContainer>
  );
}
