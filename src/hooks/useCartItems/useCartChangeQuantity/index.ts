import { thunkChangeItemQuantity } from '../../../states/actions/cart';
import { useAppDispatch } from '../../../states/store';
import { ItemInCart } from '../../../types';

const useCartChangeQuantity = () => {
  const dispatch = useAppDispatch();

  const changeQuantity = (item: ItemInCart, quantity: number) => {
    dispatch(thunkChangeItemQuantity(item, quantity));
  };

  return { changeQuantity };
};

export default useCartChangeQuantity;
