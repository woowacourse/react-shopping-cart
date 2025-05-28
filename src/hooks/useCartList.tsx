import { useEffect, useState } from 'react';
import { CartItemProps } from '../types/cartItem';

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
}

export default useCartList;
