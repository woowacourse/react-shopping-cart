import { useEffect, useState } from 'react';
import getCartItems from '../api/getCartItems';
import { CartItem } from '../types';
import { useErrorToast } from '../contexts/ErrorToast/ErrorToastContext';

const useCartItems = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { showError } = useErrorToast();

  const fetchData = async () => {
    try {
      const data = await getCartItems();
      setCartItems(data);
    } catch (e) {
      showError(
        '장바구니 아이템을 불러오는 데 실패했습니다. 잠시 후 다시 시도해주세요.'
      );
    }
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
