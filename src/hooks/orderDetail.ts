import { useEffect, useState } from 'react';
import { requestGetOrder } from '../apis/order';
import { Order } from '../type';
import { parseOrderData } from '../utils/parseData';

const useOrderDetail = (orderId: Order['id']) => {
  const [orderItems, setOrderItems] = useState<Order['orderItems']>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [responseOK, setResponseOK] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await requestGetOrder(orderId);
        const order = response.data;
        setOrderItems(parseOrderData(order).orderItems);
        setResponseOK(true);
      } catch (error) {
        console.error(error);
        setResponseOK(false);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [orderId]);

  return { orderItems, loading, responseOK };
};

export default useOrderDetail;
