import useReduxState from './useReduxState';
import { useEffect } from 'react';
import { addCartItemAsync } from 'reducers/cart/cart.thunk';

const useAddCartItem = () => {
  const {
    dispatch,
    state: { isLoadingAddCartItem, isSucceedAddCartItem, isErrorAddCartItem },
  } = useReduxState('cart');

  useEffect(() => {
    console.log('render');
  }, [isLoadingAddCartItem, isSucceedAddCartItem, isErrorAddCartItem]);

  const addCarItem = (id) => {
    dispatch(addCartItemAsync(id));
  };

  return { addCarItem };
};

export default useAddCartItem;
