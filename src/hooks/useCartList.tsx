import { useEffect, useState } from 'react';
import { CartItemProps } from '../types/cartItem';

function useCartList() {
  const [cartList, setCartList] = useState<CartItemProps[]>([]);

  useEffect(() => {
    fetch(`/cart-items`)
      .then((res) => res.json())
      .then((data) => setCartList(data.content));
  }, []);

  return { cartList };
}

export default useCartList;
