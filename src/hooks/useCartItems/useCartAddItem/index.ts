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

  //TODO: id를 서버가 요구하는 타입으로 바꿀것인가 말것인가 고민해보기
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
