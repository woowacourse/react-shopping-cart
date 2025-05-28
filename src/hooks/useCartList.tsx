import { useEffect, useState } from 'react';
import { CartItemProps } from '../types/cartItem';
import { apiRequest } from '../apis/apiRequest';

function useCartList() {
  const [cartList, setCartList] = useState<CartItemProps[]>([]);

  useEffect(() => {
    loadCartList();
  }, []);

  const loadCartList = async () => {
    const response = await apiRequest({
      url: '/cart-items',
      method: 'GET',
    });

    setCartList(response.content);
  };

  const increaseCartItem = async (cartItem: CartItemProps) => {
    await apiRequest({
      url: `/cart-items/${cartItem.id}`,
      method: 'PATCH',
      body: JSON.stringify({
        id: cartItem.id,
        quantity: cartItem.quantity + 1,
      }),
    });

    await loadCartList();
  };

  const decreaseCartItem = async (cartItem: CartItemProps) => {
    await apiRequest({
      url: `/cart-items/${cartItem.id}`,
      method: 'PATCH',
      body: JSON.stringify({
        id: cartItem.id,
        quantity: cartItem.quantity - 1,
      }),
    });

    await loadCartList();
  };

  return { cartList, increaseCartItem, decreaseCartItem };
}

export default useCartList;
