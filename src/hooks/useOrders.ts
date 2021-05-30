import { useState } from 'react';
import { requestGetOrders } from '../apis/order';
import { CartItem, Order } from '../type';
import { parseOrderDataList } from '../utils/parseData';
import useRequest from './useRequest';

const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  const { loading, responseOK } = useRequest(async () => {
    const response = await requestGetOrders();
    setOrders(parseOrderDataList(response.data));
  });

  const getOrderedProduct = (orderId: Order['id'], itemId: CartItem['id']) => {
    const order = orders.find(order => order.id === orderId);
    const product = order?.orderItems.find(orderItem => orderItem.id === itemId);

    return product;
  };

  return { orders, loading, responseOK, getOrderedProduct };
};

export default useOrders;
