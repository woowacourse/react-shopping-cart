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
  const {
    isSelectedList,
    isAllSelected,
    setIsSelectedList,
    getSelectedCartItems,
    toggleSelect,
    toggleAllSelect,
  } = useCartSelection();

  const selectCartItems = getSelectedCartItems(cartItems);
  const orderPrice = calculateOrderPrice(selectCartItems);

  const fetch = useCallback(async () => {
    const data = await baseAPI<PaginationResponse<CartItemType>>({
      method: 'GET',
      path: '/cart-items?page=0&size=20',
    });

    if (data) {
      setCartItems(data.content);
      setIsSelectedList(
        Array.from({ length: data.content.length }, () => true)
      );
    }
  }, [setIsSelectedList]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const disabled = !isSelectedList.some((isSelected) => isSelected);

  const moveToOrderConfirm = () => {
    navigate('/order-confirmation', {
      state: { orderProducts: selectCartItems },
    });
  };

  return {
    cartItems,
    isSelectedList,
    isAllSelected,
    toggleSelect,
    toggleAllSelect,
    fetch,
    orderPrice,
    disabled,
    moveToOrderConfirm,
  };
}

export default useCartContents;
