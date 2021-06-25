import { thunkChangeItemQuantity } from '../../../states/actions/cart';
import { useAppDispatch } from '../../../states/store';
import { CartItem } from '../../../types';

const useCartChangeQuantity = () => {
  const dispatch = useAppDispatch();

  const changeQuantity = (item: CartItem, quantity: number) => {
    dispatch(thunkChangeItemQuantity(item, quantity));
  };

  return { changeQuantity };
};

export default useCartChangeQuantity;
