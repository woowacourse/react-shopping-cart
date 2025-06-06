import { useState, useEffect, useRef } from 'react';
import { CartItemType, OrderItemType } from '@entities/cart';

export const useOrderSelection = (cartItems: CartItemType[] | undefined) => {
  const [orderIdList, setOrderIdList] = useState<OrderItemType>([]);
  const isFirstLoad = useRef(true);

  useEffect(() => {
    if (cartItems && cartItems.length > 0 && isFirstLoad.current) {
      setOrderIdList(cartItems.map((item) => item.id));
      isFirstLoad.current = false;
    }
  }, [cartItems]);

  const cartIds = new Set(cartItems?.map((item) => item.id) || []);
  const isAllChecked = cartIds.size > 0 && [...cartIds].every((id) => orderIdList.includes(id));

  const toggleAllSelection = () => {
    if (isAllChecked) {
      setOrderIdList([]);
    } else {
      setOrderIdList(cartItems?.map((item) => item.id) || []);
    }
  };

  const addOrderItemId = (id: number) => {
    setOrderIdList((prev) => [...prev, id]);
  };

  const removeOrderItemId = (id: number) => {
    setOrderIdList((prev) => prev.filter((orderId) => orderId !== id));
  };

  const toggleOrderItemId = (id: number) => {
    if (orderIdList.includes(id)) {
      removeOrderItemId(id);
    } else {
      addOrderItemId(id);
    }
  };

  return {
    orderIdList,
    isAllChecked,
    toggleAllSelection,
    addOrderItemId,
    removeOrderItemId,
    toggleOrderItemId,
  };
};
