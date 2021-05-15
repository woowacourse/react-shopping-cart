import { useEffect, useState } from 'react';
import { requestGetOrders } from '../apis/order';
import { Order } from '../type';
import { parseOrderDataList } from '../utils/parseData';

const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [responseOK, setResponseOK] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await requestGetOrders();
        setOrders(parseOrderDataList(response.data));
        setResponseOK(true);
      } catch (error) {
        console.error(error);
        setResponseOK(false);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { orders, loading, responseOK };
};

export default useOrders;
