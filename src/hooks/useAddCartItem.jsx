import { useDispatch } from 'react-redux';
import { addCartItemAsync } from '../store/cart/cart.actions';

const useAddCartItem = () => {
  const dispatch = useDispatch();

  const addCartItem = (id) => {
    dispatch(addCartItemAsync(id));
  };

  return { addCartItem };
};

export default useAddCartItem;
