import { useEffect, useState } from 'react';
import { CartItem } from '../types/Cart.types';
import { getCartItemList } from '@/api/cart';

export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set());
  // true인 아이템들의 id를 저장하는 Set

  console.log(cart);
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const data = await getCartItemList();
        setCart(data);
        setCheckedItems(new Set(data.map((item) => item.id)));
        // cart에 존재하는 아이템들을 다 체크된 상태로 초기화
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };

    fetchCart();
  }, []);

  const cartItems = cart.map((item) => ({
    ...item,
    isChecked: checkedItems.has(item.id),
  }));

  const toggleCheck = (id: number) => {
    setCheckedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      }
      if (!newSet.has(id)) {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const toggleAllCheck = () => {
    setCheckedItems((prev) => {
      const newSet = new Set<number>();
      if (prev.size === cart.length) {
        return newSet;
      }

      cart.forEach((item) => newSet.add(item.id));
      return newSet;
    });
  };

  return { cartItems, toggleCheck, toggleAllCheck };
};
