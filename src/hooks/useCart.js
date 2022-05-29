import { useDispatch } from 'react-redux';
import {
  addCartItemAsync,
  deleteCartItemAsync,
  updateItemQuantityAsync,
} from '../store/cart/cart.actions';

const useCart = () => {
  const dispatch = useDispatch();

  const addItem = (id) => {
    dispatch(addCartItemAsync(id));
  };

  const deleteItem = (id) => {
    dispatch(deleteCartItemAsync(id));
  };

  const updateItemQuantity = (id, quantity) => {
    dispatch(updateItemQuantityAsync(id, quantity));
  };

  return { addItem, deleteItem, updateItemQuantity };
};

export default useCart;
