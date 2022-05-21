import useReduxState from 'hooks/shared/useReduxState';
import { useEffect } from 'react';
import { getOrderListAsync } from 'reducers/orderList/orderList.thunks';

const useGetOrderList = () => {
  const { dispatch, isLoading, data, isError } = useReduxState('orderList');

  const getOrderListWhenMounted = () => {
    useEffect(() => {
      dispatch(getOrderListAsync);
    }, []);
  };

  const getOrderList = async () => {
    await dispatch(getOrderListAsync);
  };

  return {
    getOrderList,
    getOrderListWhenMounted,
    orderList: data,
    isOrderListLoading: isLoading,
    isOrderListError: isError,
  };
};

export default useGetOrderList;
