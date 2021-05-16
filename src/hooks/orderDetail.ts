import { useState } from 'react';
import { requestGetOrder } from '../apis/order';
import { Order } from '../type';
import { parseOrderData } from '../utils/parseData';
import useRequest from './request';

const useOrderDetail = (orderId: Order['id']) => {
  const [orderItems, setOrderItems] = useState<Order['orderItems']>([]);

  const { loading, responseOK } = useRequest(async () => {
    const response = await requestGetOrder(orderId);
    const order = response.data;
    setOrderItems(parseOrderData(order).orderItems);
  });

  return { orderItems, loading, responseOK };
};

export default useOrderDetail;
