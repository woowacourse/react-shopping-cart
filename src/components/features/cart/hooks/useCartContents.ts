import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { baseAPI } from '../../../../api/baseAPI';
import { PaginationResponse } from '../../../../api/type';
import { CartItemType } from '../types';
import { calculateOrderPrice } from '../utils/cartCalculations';
import useCartSelection from './useCartSelection';

function useCartContents() {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const navigate = useNavigate();
  const selection = useCartSelection();

  const selectCartItems = selection.getItems(cartItems);
  const orderPrice = calculateOrderPrice(selectCartItems);

  const fetch = useCallback(async () => {
    const data = await baseAPI<PaginationResponse<CartItemType>>({
      method: 'GET',
      path: '/cart-items?page=0&size=20',
    });

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

  const disabled = !selection.selectedList.some((isSelected) => isSelected);

  const moveToOrderConfirm = () => {
    navigate('/order-confirmation', {
      state: { orderProducts: selectCartItems },
    });
  };

  return {
    selection,
    cartItems,
    fetch,
    orderPrice,
    disabled,
    moveToOrderConfirm,
  };
}

export default useCartContents;
