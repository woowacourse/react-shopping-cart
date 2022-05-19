import useReduxState from './useReduxState';
import { updateCartItemQuantityAsync } from 'reducers/cart/cart.thunk';

const useUpdateCartItem = () => {
  const { dispatch } = useReduxState('cart');

  const updateCartItemQuantity = (id, quantity) => {
    dispatch(updateCartItemQuantityAsync(id, quantity));
  };

  return { updateCartItemQuantity };
};

export default useUpdateCartItem;
