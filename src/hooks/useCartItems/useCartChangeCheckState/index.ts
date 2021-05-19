import { thunkChangeAllItemChecked, thunkChangeItemChecked } from '../../../states/actions/cart';
import { useAppDispatch, useAppSelector } from '../../../states/store';
import { ItemInCart } from '../../../types';

const useCartChangeCheckState = () => {
  const dispatch = useAppDispatch();
  const [itemsInCart] = useAppSelector(({ cart: { items, error, isLoading } }) => [
    items,
    error,
    isLoading,
  ]);

  const changeChecked = (item: ItemInCart) => {
    dispatch(thunkChangeItemChecked(item));
  };

  const changeAllChecked = (checked: boolean) => {
    dispatch(thunkChangeAllItemChecked(itemsInCart, checked));
  };

  return { changeChecked, changeAllChecked };
};

export default useCartChangeCheckState;
