import axios from 'axios';
import { useEffect, useState } from 'react';
import { STATUS_CODE, URL } from '../constants';
import { FORMAT_DATA } from '../services/formatData';
import useFetchingStatus from './useFetchingStatus';

const useOrderDetail = () => {
  const [order, setOrder] = useState<Order>();
  const { loading, setLoading, responseOK, setResponseOK } = useFetchingStatus();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const orderId = window.location.hash.split('/').slice(-1);
        const response = await axios.get(`${URL.ORDERS}/${orderId}`);
        if (response.status !== STATUS_CODE.GET_SUCCESS) {
          throw new Error('상품 상세 정보 조회 실패');
        }

        setOrder(FORMAT_DATA.ORDER(response.data));
        setResponseOK(true);
      } catch (error) {
        console.error(error);
        setResponseOK(false);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [setLoading, setResponseOK]);

  return { order, loading, responseOK };
};

export default useOrderDetail;
