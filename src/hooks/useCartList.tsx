import { useEffect, useState } from 'react';

interface CartItem {
  id: number;
  quantity: number;
  product: {
    id: number;
    name: string;
    price: number;
    imageUrl: string | null;
    category: string;
  };
}

function useCartList() {
  const [cartList, setCartList] = useState<CartItem[]>([]);

  useEffect(() => {
    fetch(`/cart-items`)
      .then((res) => res.json())
      .then((data) => setCartList(data.content));
  }, []);

  return { cartList };
}

export default useCartList;
