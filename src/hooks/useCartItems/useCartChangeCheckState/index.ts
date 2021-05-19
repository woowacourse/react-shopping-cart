import { thunkChangeAllItemChecked, thunkToggleItemChecked } from '../../../states/actions/cart';
import { useAppDispatch, useAppSelector } from '../../../states/store';
import { ItemInCart } from '../../../types';

const useCartChangeCheckState = () => {
  const dispatch = useAppDispatch();
  const [itemsInCart] = useAppSelector(({ cart: { items, error, isLoading } }) => [
    items,
    error,
    isLoading,
  ]);

  const toggleChecked = (item: ItemInCart) => {
    dispatch(thunkToggleItemChecked(item));
  };

  const changeAllChecked = (checked: boolean) => {
    dispatch(thunkChangeAllItemChecked(itemsInCart, checked));
  };

  return { toggleChecked, changeAllChecked, itemsInCart };
};

export default useCartChangeCheckState;
