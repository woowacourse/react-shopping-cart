import { useContext } from 'react';
import { DataContext } from '../context/DataContext';
import { CartItemsResponse } from '../types/cart';

// 단순히 context에서 cart 데이터만 가져오는 훅
export const useCartItemsData = () => {
  const { data } = useContext(DataContext);
  return data.cartItems as CartItemsResponse | undefined;
};