import useReduxState from 'hooks/useReduxState';
import { useEffect } from 'react';
import { getOrderListAsync } from 'reducers/orderList/orderList.thunks';

const useOrderList = () => {
  const { dispatch, isLoading, data, isError } = useReduxState('orderList');

  useEffect(() => {
    dispatch(getOrderListAsync);
    console.log('useEffect');
  }, []);

  return { orderList: data, isLoading, isError };
};

export default useOrderList;
