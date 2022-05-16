import useReduxState from './useReduxState';
import { useEffect } from 'react';
import { addCartItemAsync } from 'reducers/cart/cart.thunk';

const useAddCartItem = () => {
  const {
    dispatch,
    state: { isLoadingAddCartItem, isErrorAddCartItem },
  } = useReduxState('cart');

  useEffect(() => {
    console.log('render');
  }, [isLoadingAddCartItem, isErrorAddCartItem]);

  const addCarItem = (id) => {
    dispatch(addCartItemAsync(id));
  };

  return { addCarItem };
};

export default useAddCartItem;
