import { thunkAddNewItemToCart, thunkChangeItemQuantity } from '../../../states/actions/cart';
import { useAppDispatch, useAppSelector } from '../../../states/store';
import { Product } from '../../../types';

const useCartAddItem = () => {
  const dispatch = useAppDispatch();
  //TODO: cartItems로 바꾸기
  const [itemsInCart] = useAppSelector(({ cart: { items, error, isLoading } }) => [
    items,
    error,
    isLoading,
  ]);

  const addItem = (product: Product) => {
    const itemInCart = itemsInCart.find((itemInCart) => itemInCart.name === product.name);

    if (itemInCart) {
      dispatch(thunkChangeItemQuantity(itemInCart, itemInCart.quantity + 1));
      return;
    }

    dispatch(thunkAddNewItemToCart(product));
  };

  return { addItem };
};

export default useCartAddItem;
