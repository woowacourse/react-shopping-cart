import useReduxState from 'hooks/shared/useReduxState';
import { getCartListAsync } from 'reducers/cartList/cartList.thunks';
import { useEffect } from 'react';

const useGetCartList = () => {
  const { dispatch, isLoading, data, isError } = useReduxState('cartList');

  useEffect(() => {
    dispatch(getCartListAsync);
  }, []);

  return {
    cartList: data,
    isCartListLoading: isLoading,
    isCartListError: isError,
  };
};

export default useGetCartList;
