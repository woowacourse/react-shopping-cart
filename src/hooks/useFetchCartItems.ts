import { useCallback, useEffect, useState } from 'react';
import getShoppingCart from '../api/getShoppingCart';
import { CartItemTypes } from '../types/cartItem';

function useFetchCartItems() {
  const [cartItems, setCartItems] = useState<CartItemTypes[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const getCartItemData = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await getShoppingCart();
      if (cartItems.length === 0) setIsLoading(false);
      setCartItems(response);
    } catch (e) {
      setError('데이터를 가져오는데 실패했습니다');
    }
  }, [cartItems.length]);

  useEffect(() => {
    getCartItemData();
  }, [getCartItemData]);

  return { cartItems, error, isLoading, getCartItemData, setError };
}

export default useFetchCartItems;
