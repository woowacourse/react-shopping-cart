import { useSetRecoilState } from 'recoil';
import { refreshCartItemsState } from '../recoil/cartItems';
import { removeCartItem } from '../api/shoppingCart';

const useDeleteCartItem = () => {
  const updateCartItem = useSetRecoilState(refreshCartItemsState);

  const handleDeleteCartItem = async (cartItemId: number) => {
    try {
      await removeCartItem(cartItemId);
      updateCartItem([]);
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    }
  };

  return handleDeleteCartItem;
};

export default useDeleteCartItem;
