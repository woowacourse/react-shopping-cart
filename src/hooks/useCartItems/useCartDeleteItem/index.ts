import {
  thunkClearCart,
  thunkDeleteCartItem,
  thunkDeleteCheckedCartItem,
} from '../../../states/actions/cart';
import { useAppDispatch } from '../../../states/store';
import { ItemInCart } from '../../../types';

const useCartDeleteItem = () => {
  const dispatch = useAppDispatch();

  const deleteItem = (itemId: string) => {
    dispatch(thunkDeleteCartItem(itemId));
  };

  //TODO: checked 라는 상태를 알아서는 안됨
  const deleteCheckedItems = (items: ItemInCart[]) => {
    dispatch(thunkDeleteCheckedCartItem(items));
  };

  const clearCart = () => {
    dispatch(thunkClearCart());
  };

  return { deleteItem, deleteCheckedItems, clearCart };
};

export default useCartDeleteItem;
