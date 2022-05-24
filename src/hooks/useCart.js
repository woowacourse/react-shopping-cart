import useReduxState from 'hooks/useReduxState';
import { getCartItemAsync } from 'reducers/cart/cart.thunk';
import { setCart } from 'reducers/cart/cart.actions';
import { useEffect } from 'react';
import useFetch from 'hooks/useFetch';

const useCart = () => {
  const {
    dispatch,
    state: { isLoading, isError, data },
  } = useReduxState('cart');

  const { fetchApi: deleteItemApi } = useFetch({
    method: 'delete',
    url: '/cart',
    handler: (data) => dispatch(setCart(data)),
  });

  const { fetchApi: updateItemApi } = useFetch({
    method: 'put',
    url: '/cart',
    handler: (data) => dispatch(setCart(data)),
  });

  useEffect(() => {
    if (!data) {
      dispatch(getCartItemAsync);
    }
  }, []);

  const handleDeleteItem = (id) => () => {
    deleteItemApi(id);
  };

  const handleUpdateItemQuantity = (id) => (quantity) => {
    updateItemApi(`${id}/${quantity}`);
  };

  return {
    isLoading,
    isError,
    handleDeleteItem,
    handleUpdateItemQuantity,
    cartItems: data,
  };
};

export default useCart;
