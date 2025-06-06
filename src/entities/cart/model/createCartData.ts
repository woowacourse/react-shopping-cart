import { useState } from 'react';
import { CartItemType } from '@entities/cart/type/cartItem.type';

export interface CartData {
  items: CartItemType[];
  isLoading: boolean;
  errorMessage: string | null;
  setItems: (items: CartItemType[]) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useCartData = () => {
  const [items, setItems] = useState<CartItemType[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setError] = useState<string | null>(null);

  return {
    // 상태
    items,
    isLoading,
    errorMessage,
    // 상태 변경 함수
    setItems,
    setLoading,
    setError,
  };
};
