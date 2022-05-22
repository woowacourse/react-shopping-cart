import { useDispatch } from 'react-redux';
import { updateItemQuantityAsync } from '../store/cart/cart.actions';

const useUpdateItemQuantity = () => {
  const dispatch = useDispatch();

  const updateItemQuantity = (id, quantity) => {
    dispatch(updateItemQuantityAsync(id, quantity));
  };

  return { updateItemQuantity };
};

export default useUpdateItemQuantity;
