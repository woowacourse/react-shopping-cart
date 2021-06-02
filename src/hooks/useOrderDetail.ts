import { useState } from 'react';
import { requestGetOrder } from '../apis/order';
import { CartItem, Order } from '../type';
import { parseOrderData } from '../utils/parseData';
import useRequest from './useRequest';

const useOrderDetail = (orderId: Order['id']) => {
  const [orderItems, setOrderItems] = useState<Order['orderItems']>([]);

  const { loading, responseOK } = useRequest(async () => {
    const response = await requestGetOrder(orderId);
    const order = response.data;
    setOrderItems(parseOrderData(order).orderItems);
  });

  const getOrderedProduct = (itemId: CartItem['id']) => {
    const product = orderItems.find(orderItem => orderItem.id === itemId);

    return product;
  };

  return { orderItems, loading, responseOK, getOrderedProduct };
};

export default useOrderDetail;
