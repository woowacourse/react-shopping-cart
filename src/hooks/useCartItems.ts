import { useEffect, useState } from 'react';
import getCartItems from '../api/getCartItems';
import { CartItem } from '../types';

const useCartItems = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const fetchData = async () => {
    const content = await getCartItems();
    setCartItems(content);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    cartItems,
    refetch: fetchData,
  };
};

export default useCartItems;
