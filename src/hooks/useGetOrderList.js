import useReduxState from 'hooks/shared/useReduxState';
import { useEffect } from 'react';
import { getOrderListAsync } from 'reducers/orderList/orderList.thunks';

const useGetOrderList = () => {
  const { dispatch, isLoading, data, isError } = useReduxState('orderList');

  useEffect(() => {
    dispatch(getOrderListAsync);
    console.log('useEffect');
  }, []);

  return {
    orderList: data,
    isOrderListLoading: isLoading,
    isOrderListError: isError,
  };
};

export default useGetOrderList;
