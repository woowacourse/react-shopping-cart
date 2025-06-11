import { useState, useEffect, useRef } from 'react';
import { CartItemType } from '@entities/cart';
import { OrderItemIdListType } from '@entities/order';

const STORAGE_KEY = 'cart_order_selection';

export const useOrderSelection = (cartItems: CartItemType[] | undefined) => {
  const [orderIdList, setOrderIdList] = useState<OrderItemIdListType>(() => {
    const savedSelection = localStorage.getItem(STORAGE_KEY);
    if (savedSelection) {
      return JSON.parse(savedSelection);
    }
    return cartItems?.map((item) => item.id) || [];
  });
  const isFirstLoad = useRef(true);

  useEffect(() => {
    if (cartItems && cartItems.length > 0 && isFirstLoad.current) {
      const savedSelection = localStorage.getItem(STORAGE_KEY);
      if (!savedSelection) {
        const orderIds = cartItems.map((item) => item.id);
        setOrderIdList(orderIds);
      }
      isFirstLoad.current = false;
    }
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orderIdList));
  }, [orderIdList]);

  const orderIds = new Set(cartItems?.map((item) => item.id) || []);
  const isAllChecked = orderIds.size > 0 && [...orderIds].every((id) => orderIdList.includes(id));

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
