import { useSetRecoilState } from 'recoil';

import { deleteItem } from '@/apis/cartItem';
import { cartItemsState } from '@/recoil/cartItems/atoms';

const useDeleteCartItem = (cartId: number) => {
  const setCartItems = useSetRecoilState(cartItemsState);

  const handleDeleteCartItem = async () => {
    try {
      const { status } = await deleteItem(cartId);
      if (status === 204) {
        setCartItems((prevItems) => prevItems.filter((cartItem) => cartItem.id !== cartId));
      }
    } catch (err: unknown) {
      const error = err as Error;
      throw new Error(error.message);
    }
  };

  return { handleDeleteCartItem };
};

export default useDeleteCartItem;
