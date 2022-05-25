import useReduxState from 'hooks/shared/useReduxState';
import { getCartListAsync } from 'reducers/cartList/cartList.thunks';

const useGetCartList = () => {
  const { dispatch, isLoading, data, isError } = useReduxState('cartList');

  const getCartList = () => {
    dispatch(getCartListAsync);
  };

  return {
    getCartList,
    cartList: data,
    isCartListLoading: isLoading,
    isCartListError: isError,
  };
};

export default useGetCartList;
