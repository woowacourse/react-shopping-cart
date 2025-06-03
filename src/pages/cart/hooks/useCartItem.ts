import { OrderItemType } from '@/apis/cartItems/cartItem.type';
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
  const [orderIdList, setOrderIdList] = useState<OrderItemType>([]);
  const isFirstLoad = useRef(true);

  useEffect(() => {
    if (cartItems && isFirstLoad.current) {
      setOrderIdList(cartItems.map((item) => item.id));
      isFirstLoad.current = false;
    }
  }, [cartItems]);

  const cartIds = new Set(cartItems?.map((item) => item.id));
  const isAllChecked = [...cartIds].every((id) => orderIdList.includes(id));

  const orderTotalPrice = cartItems?.reduce((sum, { id, product, quantity }) => {
    if (orderIdList.includes(id)) {
      return sum + product.price * quantity;
    }

    return sum;
  }, 0);

  const toggleAllCheckBox = () => {
    if (isAllChecked) {
      setOrderIdList([]);
      return;
    }

    setOrderIdList(cartItems?.map((item) => item.id) ?? []);
  };

  const addOrderItemId = (id: number) => {
    setOrderIdList((prev) => [...prev, id]);
  };

  const removeOrderItemId = (id: number) => {
    setOrderIdList((prev) => prev.filter((orderId) => orderId !== id));
  };

  return {
    cartItems,
    isLoading,
    errorMessage,
    refetchCartItems,
    orderIdList,
    isAllChecked,
    orderTotalPrice,
    toggleAllCheckBox,
    addOrderItemId,
    removeOrderItemId,
  };
};
