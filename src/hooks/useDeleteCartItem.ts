import { useRecoilState } from 'recoil';
import { removeCartItem } from '../api/shoppingCart';
import { cartItemsState } from '../recoil/cartItems';

const useDeleteCartItem = () => {
  const [cartItems, setCartItems] = useRecoilState(cartItemsState);

  const handleDeleteCartItem = async (cartItemId: number) => {
    try {
      await removeCartItem(cartItemId);
      setCartItems(
        cartItems.filter((cartItem) => {
          return cartItem.id !== cartItemId;
        }),
      );
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    }
  };

  return handleDeleteCartItem;
};

export default useDeleteCartItem;
