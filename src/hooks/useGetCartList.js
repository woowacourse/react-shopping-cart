import useReduxState from 'hooks/shared/useReduxState';
import { getCartListAsync } from 'reducers/cartList/cartList.thunks';
import { useEffect } from 'react';

const useGetCartList = () => {
  const { dispatch, isLoading, data, isError } = useReduxState('cartList');

  const getCartListWhenMounted = () => {
    useEffect(() => {
      dispatch(getCartListAsync);
    }, []);
  };

  const getCartList = () => {
    dispatch(getCartListAsync);
  };

  return {
    getCartList,
    getCartListWhenMounted,
    cartList: data,
    isCartListLoading: isLoading,
    isCartListError: isError,
  };
};

export default useGetCartList;
