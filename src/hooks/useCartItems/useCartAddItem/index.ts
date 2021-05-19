import { thunkAddItemToCart, thunkChangeItemQuantity } from '../../../states/actions/cart';
import { useAppDispatch, useAppSelector } from '../../../states/store';
import { Product } from '../../../types';

const useCartAddItem = () => {
  const dispatch = useAppDispatch();
  const [itemsInCart] = useAppSelector(({ cart: { items, error, isLoading } }) => [
    items,
    error,
    isLoading,
  ]);

  const addItem = (item: Product) => {
    const itemInCart = itemsInCart.find((itemInCart) => itemInCart.id === item.id);

    if (itemInCart) {
      dispatch(thunkChangeItemQuantity(itemInCart, itemInCart.quantity + 1));
      return;
    }

    dispatch(thunkAddItemToCart(item));
  };

  return { addItem };
};

export default useCartAddItem;
