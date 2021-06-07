import { thunkChangeAllItemChecked, thunkToggleItemChecked } from '../../../states/actions/cart';
import { useAppDispatch, useAppSelector } from '../../../states/store';
import { CartItem } from '../../../types';

const useCartChangeCheckState = () => {
  const dispatch = useAppDispatch();
  const [cartItems] = useAppSelector(({ cart: { items, error, isLoading } }) => [
    items,
    error,
    isLoading,
  ]);

  const toggleChecked = (item: CartItem) => {
    dispatch(thunkToggleItemChecked(item));
  };

  const changeAllChecked = (checked: boolean) => {
    dispatch(thunkChangeAllItemChecked(cartItems, checked));
  };

  return { toggleChecked, changeAllChecked };
};

export default useCartChangeCheckState;
