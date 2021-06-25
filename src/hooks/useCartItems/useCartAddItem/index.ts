import { thunkAddNewItemToCart, thunkChangeItemQuantity } from '../../../states/actions/cart';
import { useAppDispatch, useAppSelector } from '../../../states/store';
import { Product } from '../../../types';

const useCartAddItem = () => {
  const dispatch = useAppDispatch();
  const [cartItems] = useAppSelector(({ cart: { items, error, isLoading } }) => [
    items,
    error,
    isLoading,
  ]);

  const addItem = (product: Product) => {
    const cartItem = cartItems.find((cartItem) => cartItem.name === product.name);

    if (cartItem) {
      dispatch(thunkChangeItemQuantity(cartItem, cartItem.quantity + 1));
      return;
    }

    dispatch(thunkAddNewItemToCart(product));
  };

  return { addItem };
};

export default useCartAddItem;
