import { useCallback, useEffect, useState } from 'react';
import getShoppingCart from '../api/getShoppingCart';
import { CartItemTypes } from '../types/cartItem';

function useFetchCartItems() {
  const [cartItems, setCartItems] = useState<CartItemTypes[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const getCartItemData = useCallback(async () => {
    try {
      const response = await getShoppingCart();
      setCartItems(response);
    } catch (e) {
      setError('데이터를 가져오는데 실패했습니다');
    }
  }, []);

  useEffect(() => {
    const fetchOnce = async () => {
      setIsLoading(true);
      await getCartItemData();
      setIsLoading(false);
    };
    fetchOnce();
  }, [getCartItemData]);

  return { cartItems, error, isLoading, getCartItemData, setError };
}

export default useFetchCartItems;
