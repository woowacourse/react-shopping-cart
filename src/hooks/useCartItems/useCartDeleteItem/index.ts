import { thunkDeleteCartItem, thunkDeleteCartItems } from '../../../states/actions/cart';
import { useAppDispatch } from '../../../states/store';
import { CartItem } from '../../../types';

const useCartDeleteItem = () => {
  const dispatch = useAppDispatch();

  const deleteItem = (itemId: string) => {
    return dispatch(thunkDeleteCartItem(itemId));
  };

  const deleteItems = (items: CartItem[]) => {
    return dispatch(thunkDeleteCartItems(items));
  };

  return { deleteItem, deleteItems };
};

export default useCartDeleteItem;
