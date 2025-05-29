import { CartItemType } from '@/apis/cartItems/cartItem.type';
import { getCartItems } from '@/apis/cartItems/getCartItems';
import useFetchData from '@/shared/hooks/useFetchData';
import { useEffect, useRef, useState } from 'react';

export const useCartItem = () => {
  const {
    data: cartItems,
    isLoading,
    errorMessage,
    refetch: refetchCartItems,
  } = useFetchData({ fetchFn: getCartItems });
  const [orderList, setOrderList] = useState<CartItemType[]>([]);
  const isFirstLoad = useRef(true);

  useEffect(() => {
    if (cartItems && isFirstLoad.current) {
      setOrderList(cartItems);
      isFirstLoad.current = false;
    }
  }, [cartItems]);

  const cartIds = new Set(cartItems?.map((item) => item.id));
  const orderIds = new Set(orderList.map((item) => item.id));
  const isAllChecked = [...cartIds].every((id) => orderIds.has(id));
  const orderTotalPrice = orderList.reduce((sum, { product, quantity }) => {
    return sum + product.price * quantity;
  }, 0);

  const toggleAllCheckBox = () => {
    if (isAllChecked) {
      setOrderList([]);
      return;
    }

    setOrderList(cartItems ?? []);
  };

  const addOrderItem = (cartItem: CartItemType) => {
    setOrderList((prev) => [...prev, cartItem]);
  };

  const removeOrderItem = (id: number) => {
    const newOrderList = orderList.filter((order) => order.id !== id);
    setOrderList(newOrderList);
  };

  const updateOrderItem = (id: number, quantity: number) => {
    const updateOrderList = orderList.map((order) => {
      if (order.id === id) {
        return { ...order, quantity };
      }

      return order;
    });
    setOrderList(updateOrderList);
  };

  return {
    cartItems,
    isLoading,
    errorMessage,
    refetchCartItems,
    orderList,
    isAllChecked,
    orderTotalPrice,
    toggleAllCheckBox,
    addOrderItem,
    removeOrderItem,
    updateOrderItem,
  };
};
