import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { PaginationResponse } from '../../../../api/type';
import { CartItemType } from '../types';
import useCartSelection from './useCartSelection';
import useFetch from './useFetch';

function useCartContents() {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const navigate = useNavigate();
  const selection = useCartSelection(cartItems);
  const fetcher = useFetch<PaginationResponse<CartItemType>>();

  const fetch = useCallback(async () => {
    const data = await fetcher('/cart-items?page=0&size=20');

    if (data) {
      setCartItems(data.content);
      selection.setSelectedList(
        Array.from({ length: data.content.length }, () => true)
      );
    }
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const moveToOrderConfirm = () => {
    navigate('/order-confirmation', {
      state: { orderProducts: selection.selectCartItems },
    });
  };

  return {
    selection,
    cartItems,
    fetch,
    moveToOrderConfirm,
  };
}

export default useCartContents;
