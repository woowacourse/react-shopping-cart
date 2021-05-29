import { useState } from 'react';
import { requestGetOrders } from '../apis/order';
import { Order } from '../type';
import { parseOrderDataList } from '../utils/parseData';
import useRequest from './useRequest';

const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  const { loading, responseOK } = useRequest(async () => {
    const response = await requestGetOrders();
    setOrders(parseOrderDataList(response.data));
  });

  return { orders, loading, responseOK };
};

export default useOrders;
