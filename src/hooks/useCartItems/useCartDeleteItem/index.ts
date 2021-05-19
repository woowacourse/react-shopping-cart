import {
  thunkClearCart,
  thunkDeleteCartItem,
  thunkDeleteCartItems,
} from '../../../states/actions/cart';
import { useAppDispatch } from '../../../states/store';
import { ItemInCart } from '../../../types';

const useCartDeleteItem = () => {
  const dispatch = useAppDispatch();

  const deleteItem = (itemId: string) => {
    dispatch(thunkDeleteCartItem(itemId));
  };

  const deleteItems = (items: ItemInCart[]) => {
    dispatch(thunkDeleteCartItems(items));
  };

  const clearCart = () => {
    dispatch(thunkClearCart());
  };

  return { deleteItem, deleteItems, clearCart };
};

export default useCartDeleteItem;
