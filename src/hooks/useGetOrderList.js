import useReduxState from 'hooks/shared/useReduxState';
import { getOrderListAsync } from 'reducers/orderList/orderList.thunks';

const useGetOrderList = () => {
  const { dispatch, isLoading, data, isError } = useReduxState('orderList');

  const getOrderList = async () => {
    await dispatch(getOrderListAsync);
  };

  return {
    getOrderList,
    orderList: data,
    isOrderListLoading: isLoading,
    isOrderListError: isError,
  };
};

export default useGetOrderList;
