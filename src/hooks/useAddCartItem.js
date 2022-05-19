import useReduxState from './useReduxState';
import { addCartItemAsync } from 'reducers/cart/cart.thunk';

const useAddCartItem = () => {
  const { dispatch } = useReduxState('cart');

  const addCarItem = (id) => {
    dispatch(addCartItemAsync(id));
  };

  return { addCarItem };
};

export default useAddCartItem;
