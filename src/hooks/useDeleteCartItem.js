import { useDispatch } from 'react-redux';
import { deleteCartItemAsync } from '../store/cart/cart.actions';

const useDeleteCartItem = () => {
  const dispatch = useDispatch();

  const deleteCartItem = (id) => {
    dispatch(deleteCartItemAsync(id));
  };

  return { deleteCartItem };
};

export default useDeleteCartItem;
