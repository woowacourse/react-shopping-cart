import useReduxState from './useReduxState';
import { deleteCartItemAsync } from 'reducers/cart/cart.thunk';

const useDeleteCartItem = () => {
  const { dispatch } = useReduxState('cart');

  const deleteCartItem = (id) => {
    dispatch(deleteCartItemAsync(id));
  };

  return { deleteCartItem };
};

export default useDeleteCartItem;
