import { useSetRecoilState } from 'recoil';

import LocalStorage, { CART_ITEM } from '@/Storage';
import { deleteItem } from '@apis/cartItem';
import { cartItemsState } from '@recoil/cartItems/atoms';

const useCartItems = (cartId: number) => {
  const setCartItems = useSetRecoilState(cartItemsState);

  const deleteCartItem = async () => {
    setCartItems((prevItems) => prevItems.filter((cartItem) => cartItem.id !== cartId));
    await deleteItem(cartId);
    LocalStorage.deleteData(CART_ITEM, cartId);
  };

  return { deleteCartItem };
};

export default useCartItems;
